<?php
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

        if ( !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo "Oops! There was a problem with your submission (1) Please complete the form and try again." ;
            exit;
        }


        $recipient = "contact@instant-b.fr";
        // $recipient = "ljayame@gmail.com";
        $subject = trim($_POST["subject"]);
        $firstname = strip_tags(trim($_POST["firstname"]));
        $lastname = strip_tags(trim($_POST["lastname"]));

        $email_content = "Raison sociale: " . strip_tags(trim($_POST["social"])) . "\n";
        $email_content .= "Addresse: " . strip_tags(trim($_POST["address"])) . "\n\n";

        $email_content .= "Nom: " . strip_tags(trim($_POST["lastname"])) . "\n";
        $email_content .= "Prénom: " . strip_tags(trim($_POST["firstname"])) . "\n";
        $email_content .= "Fonction: " . strip_tags(trim($_POST["job"])) . "\n";
        $email_content .= "Email: " . strip_tags(trim($_POST["email"])) . "\n";
        $email_content .= "Téléphone fixe: " . strip_tags(trim($_POST["landline"])) . "\n";
        $email_content .= "Téléphone portable: " . strip_tags(trim($_POST["mobile"])) . "\n\n";

        $email_content .= "Date de l'évènement: " . strip_tags(trim($_POST["date"])) . "\n";
        $email_content .= "Nombre de participants: " . strip_tags(trim($_POST["size"])) . "\n";
        $email_content .= "Addresse de l'évènement: " . strip_tags(trim($_POST["location"])) . "\n";
        $email_content .= "Durée de l'évènement: " . strip_tags(trim($_POST["duration"])) . "\n";
        $email_content .= "Prestations: " . strip_tags(trim($_POST["prestations"])) . "\n";
        $email_content .= "Commentaires: " . strip_tags(trim($_POST["comments"])) . "\n";


        // Build the email headers.
        $email_headers = "From: $firstname . $lastname <$email>"."\n";
        $email_headers .='Reply-To: contact@instant-b.fr'."\n";

        $email_headers .='Content-Type: text/plain; charset="utf-8"'."\n";
        $email_headers .='Content-Transfer-Encoding: 8bit';

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission (2), please try again.";
    }

?>