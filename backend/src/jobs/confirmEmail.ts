import { sendEmail } from '../services/email';
import { JobProps } from '.';
import dotenv from 'dotenv';

dotenv.config();

const ConfirmEmail: JobProps = {
  key: 'ConfirmEmail',
  priority: process.env.REDIS_PRIORITY_HIGH,
  async handle(job: any) {
    const { data } = job;

    console.log(data)
    
    await sendEmail(data.name, data.email, data.verificationToken);
  },
};

export default ConfirmEmail;