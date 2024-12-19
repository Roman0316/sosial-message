const ErrorMessages = {
  auth_user_already_exists: 'user_already_exists',
  auth_invalid_email_or_password: 'auth_invalid_email_or_password',
  auth_invalid_password: 'auth_invalid_password',
  auth_jwt_invalid_token: 'auth_jwt_invalid_token',
  auth_redis_jwt_invalid_token: 'auth_redis_jwt_invalid_token',
  auth_missing_jwt_token: 'auth_missing_jwt_token',

  missing_required_field: 'missing_required_field',

  user_not_found: 'user_not_found',

  user_or_post_not_found: 'user_or_post_not_found',

  invalid_value_offset: 'invalid_value_offset',
};

module.exports = ErrorMessages;
