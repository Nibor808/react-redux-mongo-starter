'use strict';
import { User } from '../schemas/schemas';
import bcrypt from 'bcrypt-nodejs';
import Slack from 'slack-node';
import moment from 'moment';

export const initialSave = (req, res) => {

  const newUser = new User({
    email: `${moment()}@tempemail.ca`
  });

  newUser.save((err, user) => {
    if (err) {
      logger.error(err);
      return res.send({ error: err.message });
    }

    if (!user) return res.send({ error: 'User not saved. Please contact support.' });

    res.send({ ok: { user_id: user._id } });
  });
};

export const signUpUser = (req, res) => {
  const { values, id } = req.body;
  let password = values.password;
  const email = values.email;

  bcrypt.hash(password, null, null, (err, hash) => {
    if (err) {
      logger.error(err);
      return res.send({ error: err.message });
    } else {
      password = hash;

      User.findById({ _id: id }, (err, user) => {
        if (err) {
          logger.error(err);
          return res.send({ error: err.message });
        }

        if (!user) return res.send({ error: 'No such user. Please contact support.' });

        user.email = email;
        user.password = password;
        user.save(err => {
          if (err) {
            logger.error(err);
            return res.send({ error: 'That email is already in use.' });
          } else {
            let text;

            if (process.env.NODE_ENV === 'production') {
              text = `${user.email} signed up on production!!`;
            } else if (process.env.NODE_ENV === 'qa') {
              text = `${user.email} signed up on qa!!`;
            }
            if (process.env.NODE_ENV !== 'development') { /* post to slack */
              const slack = new Slack();
              slack.setWebhook('https://hooks.slack.com/services/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');
              slack.webhook({
                channel: '#signups',
                text
              }, (err, response) => {
                if (err) {
                  logger.error(err);
                } else {
                  logger.info(response);
                }
              });
            }
            return res.send({
              ok: {
                user_id: user._id,
                isAdmin: user.isAdmin,
                isSubscribed: user.subscription.length > 0,
                message: req.app.locals.bannerMessage
              }
            });
          }
        });
      });
    }
  });
};

export const signInUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      logger.error(err);
      return res.send({ error: err.message });
    }

    if (!user) {
      return res.send({ error: 'No such user. Check your email and password.' });
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.send({ error: 'No such user. Check your email and password.' });

        if (!isMatch) return res.send({ error: 'No such user. Check your email and password.' });

        return res.send({
          ok: {
            user_id: user._id,
            isAdmin: user.isAdmin,
            isSubscribed: user.subscription.length > 0,
            message: req.app.locals.bannerMessage
          }
        });
      });
    }
  });
};

export const checkPassword = (req, res) => {
  const { id, password } = req.body;

  User.findById({ _id: id }, (err, user) => {
    if (err) {
      logger.error(err);
      return res.send({ error: err.message });
    }

    if (!user) return res.send({ error: 'No such user.' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.send({ error: 'Authentication failed.' });

      if (!isMatch) return res.send({ error: 'Authentication failed.' });

      return res.send({ ok: 'match' });
    });
  });
};
