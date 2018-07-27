'use strict';
import { User } from '../schemas/schemas';
import { sendMail } from '../../helpers/server/send_mail';
import fs from 'fs';
import path from 'path';

export const getAllUsers = (req, res) => {
  User.find({ isActive: true }, (err, users) => {
    if (err) {
      logger.error(err);
      return res.send({ error: err.message });
    } else {
      return res.send({ ok: users });
    }
  });
};

export const sendAdminEmail = (req, res) => {
  const { mailSubject, allUsersEmail, mailContent } = req.body;

  sendMail(allUsersEmail, mailSubject, mailContent)
    .then(() => {
      return res.send({ ok: 'Mail Sent.' });
    })
    .catch(err => {
      logger.error(err);
      return res.send({ error: 'Mail Not Sent.' });
    });
};

export const setBannerMessage = (req, res) => {
  req.app.locals.bannerMessage = req.body.message;
  res.send({ ok: 'ok' });
};

export const clearBannerMessage = (req, res) => {
  req.app.locals.bannerMessage = '';
  return res.send({ ok: 'ok' });
};

export const getBannerMessage = (req, res) => {
  return res.send({ ok: req.app.locals.bannerMessage });
};

export const setAdminStatus = (req, res) => {
  const { userId } = req.body;

  User.findById({ _id: userId }, (err, user) => {
    if (err) {
      logger.error(err);
      return res.send({ error: err.message });
    }

    if (!user) return res.send({ error: 'No such user.' });

    const adminStatus = user.isAdmin;
    /* flip the users admin status */
    user.isAdmin = !adminStatus;
    user.save(err => {
      if (err) {
        logger.error(err);
        return res.send({ error: 'User save has failed.' });
      } else {
        return res.send({ ok: 'Admin status changed.' });
      }
    });
  });
};

export const userFromSearch = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.send({ error: 'No such user.' });
    } else {
      return res.send({ ok: user });
    }
  });
};

export const signInAs = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) return res.send({ error: 'No such user.' });
    return res.send({
      ok: {
        user_id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isSubscribed: user.subscription.length > 0,
        message: req.app.locals.bannerMessage
      }
    });
  });
};

export const getLogs = (req, res) => {
  fs.readFile(path.resolve(__dirname, 'logs/error.log'), 'utf-8', (err, log) => {
    if (err) {
      logger.error(err);
      res.send({ error: 'No Log file found. But hey, you just created one. Try again.' });
    } else {
      res.send({ ok: log });
    }
  });
};

