<?php
require_once "/opt/lampp/htdocs/vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;

// sendEmail("이효중","hjlee@team1985.com","메일 테스트","메일 본문", "");
sendEmail("김성은","kse012050@naver.com","메일 테스트","메일 본문", "");
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
        $mail->setFrom('tlseeod@naver.com', '탄소');


        if(is_array($toMailAddress) && count($toMailAddress)>0){
            foreach ($toMailAddress as $addressInfo){
                $mail->addAddress($addressInfo["EMAIL"]);
            }
        }else{
            $mail->addAddress($toMailAddress, $receiverName);
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

echo "<script>alert('이메일 보내기 완료');location.replace('index.php');</script>";
exit;