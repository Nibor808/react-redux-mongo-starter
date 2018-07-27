'use strict';
import { User } from '../schemas/schemas';
import bcrypt from 'bcrypt-nodejs';
import { sendMail } from '../../helpers/server/send_mail';

let url;
if (process.env.NODE_ENV === 'production') {
  url = process.env.PRODUCTION_URL;
} else if (process.env.NODE_ENV === 'qa') {
  url = process.env.QA_URL;
} else {
  url = 'http://localhost:3000';
}

export const sendPasswordReset = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      logger.error(err.message);
      return res.send({ error: err.message });
    }

    if (!user) return res.send({ error: 'That email is not associated with a current user.' });

    const passResetToken = Math.random().toString(36).slice(2);

    user.passwordResetToken = passResetToken;
    user.markModified('password');
    user.save(err => {
      if (err) {
        logger.error(err);
        return res.send({ error: 'Unable to reset your password. Please contact support.' });
      }

      const mailSubject = 'Password reset request';
      const mailContent = `Follow this link to reset your password. <a href='${url}/resetpassword/${passResetToken}/${user._id}'>link</a>`;

      sendMail(email, mailSubject, mailContent)
        .then(() => {
          return res.send({ ok: 'An email has been sent to your email address with instructions on what to do next.' });
        })
        .catch(err => {
          logger.error(err);
          return res.send({ error: 'Unable to send the confirmation email. Please contact support.' });
        });
    });
  });
};

export const resetPassword = (req, res) => {
  let { password, token, id } = req.body;

  User.findById({ _id: id }, (err, user) => {
    if (err) {
      logger.error(err.message);
      return res.send({ error: err.message });
    }

    if (!user) return res.send({ error: 'No such user.' });

    if (user.passwordResetToken !== token) return res.send({ error: 'The password reset link has expired.' });

    bcrypt.hash(password, null, null, (err, hash) => {
      if (err) {
        return logger.error(err);
      } else {
        password = hash;

        user.password = password;
        user.passwordResetToken = '';
        user.markModified('password');
        user.save(err => {
          if (err) {
            logger.error(err);
            return res.send({ error: 'Unable to reset your password. Please contact support.' });
          }

          const mailSubject = 'Password Change';
          const mailContent = `Your password has just been reset. If this was you, you can
          safely ignore this message. If this wasn't you, please <a href='${url}'>sign in</a>
          to your account and change your password, then
          contact <a href='mailto:support@ontariodivorceresource.ca?subject=Unauthorizied
          Password Change'>support</a> right away.`;

          sendMail(user.email, mailSubject, mailContent)
            .then(() => {
              return res.send({ ok: 'Your password has been reset. Go ahead and sigin in!' });
            })
            .catch(err => {
              logger.error(err);
              return res.send({ error: 'Unable to send the confirmation email. Please contact support.' });
            });
        });
      }
    });
  });
};

export const getEmail = (req, res) => {
  const { id } = req.body;

  User.findById({ _id: id }, (err, user) => {
    if (err) {
      logger.error(err);
      return res.send({ error: err.message });
    }

    if (!user) return res.send({ error: 'No such user.' });

    return res.send({ ok: user.email });
  });
};

export const updateEmail = (req, res) => {
  const { email, id } = req.body;

  User.findOneAndUpdate({ _id: id }, { $set: { email: email } }, { new: true }, (err, user) => {
    if (err) {
      logger.error(err);
      if (err.message.includes('E11000 duplicate key error')) {
        return res.send({ error: 'That email is already in use.' });
      }
      return res.send({ error: err.message });
    }

    if (!user) return res.send({ error: 'No such user.' });

    return res.send({
      ok: {
        user_id: user._id,
        isAdmin: user.isAdmin,
        message: req.app.locals.bannerMessage,
        confirmEmail: 'Your email has been updated'
      }
    });
  });
};

export const changePassword = (req, res) => {
  let { password, id } = req.body;

  bcrypt.hash(password, null, null, (err, hash) => {
    if (err) return logger.error(err);

    User.findOneAndUpdate({ _id: id }, { $set: { password: hash } }, (err, user) => {
      if (err) {
        logger.error(err);
        return res.send({ error: 'Unable to update your password. Please contact support.' });
      }

      if (!user) return res.send({ error: 'No such user.' });

      const mailSubject = 'Password Change';
      const mailContent = `Your password has just been reset. If this was you, you can
      safely ignore this message. If this wasn't you, please <a href='${url}'>sign in</a>
      to your account and change your password, then
      contact <a href='mailto:support@ontariodivorceresource.ca?subject=Unauthorized
      Password Change'>support</a> right away.`;

      sendMail(user.email, mailSubject, mailContent)
        .then(() => {
          return res.send({ ok: 'Your password has been updated.' });
        })
        .catch(err => {
          logger.error(err);
          return res.send({ error: 'Unable to send the confirmation email. Please contact support.' });
        });
    });
  });
};
