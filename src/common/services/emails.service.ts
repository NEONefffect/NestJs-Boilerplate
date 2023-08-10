import { Injectable, Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";

import config from "config";

interface EmailParams {
  message: string;
  recipient: string;
  subject: string;
}

@Injectable()
export class EmailsService {
  private readonly SES = new AWS.SES(config.AWS);
  private readonly logger = new Logger(EmailsService.name);

  sendEmail({ message, subject, recipient }: EmailParams) {
    const params: AWS.SES.SendEmailRequest = {
      Source: config.ROOT_EMAIL,
      Destination: {
        ToAddresses: Array.isArray(recipient) ? recipient : [recipient],
      },
      Message: {
        Body: {
          Html: {
            Data: message,
          },
        },
        Subject: {
          Data: subject,
        },
      },
    };

    try {
      return this.SES.sendEmail(params).promise();
    } catch (e) {
      this.logger.error(e.message || e);
    }
  }
}
