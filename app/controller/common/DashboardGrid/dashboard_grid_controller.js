import db from '../../../../database/models/index.js'
import common_js from '../../../controller/common/common_controller.js'

const DashboardGrid = db.db.m_grids;


const getGrid = async (req, res) => {
    if (!req.body) {
        common_js.message.went_wrong(res)
        return
    }
    else {
        try {
            var condition, attributes;
            if (req.role == process.env.ROLE_PUBLIC) {
                condition = {
                    avl_public: 'Y',
                    public_status: 1
                }
                attributes=['module_name','avl_public','public_priority','public_status','public_image']
            }
            else if (req.role == process.env.ROLE_NETA) {
                condition = {
                    avl_neta: 'Y',
                    neta_status: 1
                }
                attributes=['module_name','avl_neta','neta_priority','neta_status','neta_image']
            }
            var dashboardGridDetails = await DashboardGrid.findAll({
                where: condition,
                attributes: attributes
            })
            common_js.message.data_found(dashboardGridDetails, res)

        } catch (e) {
            console.log(process.env.ERROR_CODE_3, e)
        }
    }
}

export default { getGrid }
