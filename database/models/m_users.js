'use strict';
export default (sequelize, DataTypes) => {
  const m_users = sequelize.define('m_users', {
    uid: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    gender: DataTypes.STRING,
    mobile_code: DataTypes.STRING,
    mobile_no: DataTypes.STRING,
    email: DataTypes.STRING,
    email_verified: DataTypes.STRING,
    kyc_status: DataTypes.STRING,
    mpin: DataTypes.STRING,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL,
    last_login: DataTypes.DATE,
    last_latitude: DataTypes.DECIMAL,
    last_longitude: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});

  return m_users;
};
