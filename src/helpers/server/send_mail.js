'use strict';
import sg, { mail as helper } from 'sendgrid';
const sgClient = sg(process.env.SENDGRID_API_KEY);

export const sendMail = (emailOrEmails, mailSubject, mailContent) => {

  const mail = new helper.Mail();
  const emails = Array.isArray(emailOrEmails) ? emailOrEmails : emailOrEmails.split();

  mail.setFrom(new helper.Email('support@ontariodivorceresource.ca'));
  mail.addContent(new helper.Content('text/html', mailContent));

  emails.forEach(email => {
    const personalization = new helper.Personalization();
    personalization.subject = mailSubject;
    personalization.tos = [new helper.Email(email)];

    mail.addPersonalization(personalization);
  });

  const request = sgClient.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return new Promise((resolve, reject) => {
    sgClient.API(request, (error, response) => {
      if (error) {
        logger.error(error.response);
        logger.error(error.response.statusCode);
        logger.error(error.response.body);
        logger.error(error.response.headers);
        reject();
      } else {
        logger.info(response.statusCode);
        logger.info(response.body);
        logger.info(response.headers);
        resolve();
      }
    });
  });
};
