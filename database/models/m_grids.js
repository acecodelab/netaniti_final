'use strict';
export default (sequelize, DataTypes) => {
  const m_grids = sequelize.define('m_grids', {
    module_name: DataTypes.STRING,
    avl_neta: DataTypes.STRING,
    neta_priority: DataTypes.INTEGER,
    neta_status: DataTypes.INTEGER,
    avl_public: DataTypes.STRING,
    public_priority: DataTypes.INTEGER,
    public_status: DataTypes.INTEGER,
    neta_image: DataTypes.STRING,
    public_image: DataTypes.STRING,

  }, {});

  return m_grids;
};
