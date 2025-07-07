import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default () => ({
  mailer: {
    transport: {
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '587', 10),
      ignoreTLS: false,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    },
    defaults: {
      from: '"Zenmonk" <no-reply@zenmonk.tech>',
    },
    preview: true,
    template: {
      dir: join(process.cwd(), 'src/templates'),
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  },
});
