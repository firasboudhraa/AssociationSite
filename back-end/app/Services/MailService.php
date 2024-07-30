<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

class MailService
{
    protected $mailer;

    public function __construct()
    {
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../'); 
        $dotenv->load();

        $this->mailer = new PHPMailer(true);
        $this->mailer->SMTPDebug = 2; 
    }

    public function sendEmail($toEmail, $toName, $subject, $htmlBody)
    {
        try {
            $this->mailer->isSMTP();
            $this->mailer->Host = getenv('MAIL_HOST');
            $this->mailer->SMTPAuth = true;
            $this->mailer->Username = getenv('MAIL_USERNAME');
            $this->mailer->Password = getenv('MAIL_PASSWORD');
            $this->mailer->SMTPSecure = getenv('MAIL_ENCRYPTION');
            $this->mailer->Port = getenv('MAIL_PORT');

            $this->mailer->setFrom(getenv('MAIL_FROM_ADDRESS'), getenv('MAIL_FROM_NAME'));
            $this->mailer->addAddress($toEmail, $toName);

            $this->mailer->isHTML(true);
            $this->mailer->Subject = $subject;
            $this->mailer->Body = $htmlBody;

            // Send email
            $this->mailer->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
