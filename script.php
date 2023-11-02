<?php

// First of all, we need to check if there is a post request.
if (isset($_POST['message'])) {
    /* if we have a post request, we have to decode the json string that
    we are receiving */
    $data = json_decode($_POST['message']);
    /* The decoded json string is now a php object */

    /* Next i loop trough the object to check for empty fields.
    I know that we have done this check in the javascript file, but never rely on front end validation.
    Front end validation is only done for a better user experience. */
    foreach ($data as $value) {
        if (empty(trim($value))) {
            /* If there is an empty field, we send a message back to the javascript file. */
            echo "Alles moet ingevuld worden";
            exit(); /* and we stop the script here. */
        }
    }
    
    /* If there are no empty fields, i create new variables containing the input values
    just to keep our script simple, so we can understand what is going on. */
    $firstname =  $data->name; /* Remember that $data is an object now */
    $email =  $data->email;
    $message = $data->message;
    /* Now i will check if the incoming email's value is valid */
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        /* if email is not valid, we send a server response with an error message */
        echo "Error: Vul een geldige E-mailadres in";
        exit();
    }

    /* Now since we are here in this line, our incoming data are correct
    and we are going to send the email. */
    
    /* SET THE EMAIL ADDRESS YOU WANT TO RECEIVE THE MESSAGES  */
    /* =============================================== */
    $to = "info@highsale.nl";
    /* =============================================== */
    
    $subject = "Contact Formulier";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: " . $firstname . "<" . $email . ">\r\n"; 
    
    // Email body content
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
      <title>Contact Formulier</title>
      <style>
        /* Inline styles for the email body */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
          padding: 20px;
          border-radius:10px;
        }
        h2 {
          color: #007BFF;
        }
        p {
          font-size: 16px;
        }
        .content {
          background-color: #ffffff;
          padding: 20px;
          border: 1px solid #ddd;
        }
      </style>
    </head>
    <body>
      <h2>Contact Formulier</h2>
      <p><strong>Naam:</strong> $firstname</p>
      <p><strong>Email:</strong> $email</p>
      <p><strong>Bericht:</strong></p>
      <p>$message</p>
    </body>
    </html>
    ";

    /* Next we are sending the email */
    $send = mail($to, $subject, $email_body, $headers);
    /* And last we check if the mail() function was successful*/
    if (!$send) {
      echo "Storing. Probeer ons te bereiken op" ;
    } else {
        echo "Succes: Bericht is verzonden";
    }
}
?>
