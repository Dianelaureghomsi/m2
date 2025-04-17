<?php
require_once 'vendor/autoload.php'; // Pour AfricasTalking SDK

class NotificationService {
    private $db;
    private $smsClient;
    private $mailer;

    public function __construct($db) {
        $this->db = $db;
        
        // Initialisation du client SMS (Africa's Talking)
        $this->smsClient = new AfricasTalking\SDK\AfricasTalking(
            SMS_USERNAME,
            SMS_API_KEY
        );
        
        // Initialisation de PHPMailer
        $this->mailer = new PHPMailer\PHPMailer\PHPMailer(true);
        $this->mailer->isSMTP();
        $this->mailer->Host = EMAIL_HOST;
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = EMAIL_USER;
        $this->mailer->Password = EMAIL_PASS;
        $this->mailer->SMTPSecure = 'tls';
        $this->mailer->Port = EMAIL_PORT;
        $this->mailer->setFrom(EMAIL_FROM, EMAIL_FROM_NAME);
    }

    /**
     * Envoie une notification à un parent
     */
    public function sendToParent($parentId, $message, $subject = null) {
        // Récupérer les infos du parent
        $parent = $this->getParentInfo($parentId);
        
        // Envoyer par SMS
        $this->sendSMS($parent['tel_p'], $message);
        
        // Envoyer par email si l'email existe
        if (!empty($parent['email_p'])) {
            $this->sendEmail($parent['email_p'], $subject ?? "Notification Scolaire", $message);
        }
        
        return true;
    }

    private function sendSMS($phoneNumber, $message) {
        try {
            // Vérifier l'opérateur pour adapter l'envoi
            if ($this->isMTNNumber($phoneNumber) || $this->isOrangeNumber($phoneNumber)) {
                $sms = $this->smsClient->sms();
                $result = $sms->send([
                    'to' => $this->formatPhoneNumber($phoneNumber),
                    'message' => $message,
                    'from' => SMS_SENDER_ID
                ]);
                
                // Journaliser le résultat
                $this->logSMSDelivery($phoneNumber, $message, $result);
            }
        } catch (Exception $e) {
            error_log("Erreur d'envoi SMS: " . $e->getMessage());
        }
    }

    private function sendEmail($email, $subject, $message) {
        try {
            $this->mailer->addAddress($email);
            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = nl2br($message);
            $this->mailer->AltBody = strip_tags($message);
            
            $this->mailer->send();
            return true;
        } catch (Exception $e) {
            error_log("Erreur d'envoi email: " . $e->getMessage());
            return false;
        }
    }

    private function isMTNNumber($number) {
        return preg_match('/^'.SMS_MTN_PREFIX.'/', $this->formatPhoneNumber($number));
    }

    private function isOrangeNumber($number) {
        return preg_match('/^'.SMS_ORANGE_PREFIX.'/', $this->formatPhoneNumber($number));
    }

    private function formatPhoneNumber($number) {
        // Format standard international pour Africa's Talking
        return preg_replace('/^0/', '237', $number);
    }

    private function getParentInfo($parentId) {
        $stmt = $this->db->prepare("SELECT * FROM parents WHERE id_parent = ?");
        $stmt->bind_param("i", $parentId);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    private function logSMSDelivery($phone, $message, $result) {
        $status = isset($result['status']) ? $result['status'] : 'error';
        $cost = isset($result['data']->SMSMessageData->Recipients[0]->cost) 
              ? $result['data']->SMSMessageData->Recipients[0]->cost 
              : '0';
        
        $query = "INSERT INTO sms_logs (phone_number, message, status, cost, date_sent) 
                  VALUES (?, ?, ?, ?, NOW())";
        $stmt = $this->db->prepare($query);
        $stmt->bind_param("ssss", $phone, $message, $status, $cost);
        $stmt->execute();
    }
}
?>