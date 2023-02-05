<?php
require_once "/opt/lampp/htdocs/vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;

$userName = $_POST['userName'];
$userMobile = $_POST['userMobile'];
sendEmail($userName,"ashley.shin@tft.best",$userName.' '.$userMobile , '이름 : '.$userName.'<br>전화번호 : '.$userMobile, "");
// sendEmail($userName,"kse012050@naver.com",$userName.' '.$userMobile , '이름 : '.$userName.'<br>전화번호 : '.$userMobile, "");
function sendEmail($receiverName, $toMailAddress, $subject, $contentBody,$attachFilePath)
{
    ////-----    이메일 발송   --------  ////

    $mail = new PHPMailer;
    try {
        $mail->CharSet = 'UTF-8';
        $mail->isSMTP();
        $mail->SMTPDebug = 0;
        $mail->Host = 'smtp.naver.com';
        if($attachFilePath!=''){
            $mail->addAttachment($attachFilePath);
        }
        $mail->Port = 587;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        $mail->Username = "tlseeod"; // 네이버 아이디
        $mail->Password = "yesly_1122"; // 네이버 비밀번호
        $mail->setFrom('tlseeod@naver.com', $receiverName);


        if(is_array($toMailAddress) && count($toMailAddress)>0){
            foreach ($toMailAddress as $addressInfo){
                $mail->addAddress($addressInfo["EMAIL"]);
            }
        }else{
            $mail->addAddress($toMailAddress, '탄소 <'.$toMailAddress.'>');
        }

        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $contentBody;
        $mail->send();
        return true;
    }catch (Exception $e){
        return false;
    }
    return true;
}  

exit;