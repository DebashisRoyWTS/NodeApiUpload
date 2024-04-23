const crudApiModel = require('../model/crudApi.model')
class crudApiController {
  /**
   * @Method showMessage
   * @Description To Show Welcome Message
   */

  async showMessage(req, res) {
    try {
      return res.status(200).json({
        message: 'Welcome to CRUD Api',
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method insert
   * @Description To Ceate User Data
   */

  async insert(req, res) {
    try {
      req.body.firstName = req.body.firstName.trim()
      req.body.lastName = req.body.lastName.trim()
      req.body.email = req.body.email.trim()
      if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        return res.status(400).json({
          message: 'Field Should Not Be Empty',
        })
      } else {
        let isEmailExists = await crudApiModel.findOne({
          email: req.body.email,
        })
        if (!isEmailExists) {
          let saveData = await crudApiModel.create(req.body)
          if (saveData && saveData._id) {
            return res.status(200).json({
              message: 'Data Added Successfully',
              data: saveData,
            })
          } else {
            return res.status(400).json({
              message: 'Data Not Added Successfully',
              data: [],
            })
          }
        } else {
          return res.status(400).json({
            message: 'Email Already Exists',
            data: [],
          })
        }
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method fetchData
   * @Description To Show Data
   */

  async fetchData(req, res) {
    try {
      let allData = await crudApiModel.find()
      return res.status(200).json({
        message: 'Data fetched Successfully',
        data: allData,
      })
    } catch (err) {
      throw err
    }
  }
  /**
   * @Method fetchDataById
   * @Description To Show Data By Id
   */

  async fetchDataById(req, res) {
    try {
      let singleData = await crudApiModel.findOne({_id:req.params.id})
      return res.status(200).json({
        message: 'Data fetched Successfully',
        data: singleData,
      })
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method delete
   * @Description To delete user data
   */

  async delete(req, res) {
    try {
      let deleteData = await crudApiModel.findByIdAndRemove(req.params.id)
      if (deleteData) {
        return res.status(200).json({
          message: 'Data Deleted successfully ',
        })
      } else {
        return res.status(400).json({
          message: 'Data not Deleted successfully ',
        })
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * @Method update
   * @Description To update user data
   */

  async update(req, res) {
    try {
      req.body.firstName = req.body.firstName
      req.body.lastName = req.body.lastName
      req.body.email = req.body.email
      if (!req.body.firstName || !req.body.lastName || !req.body.email) {
        return res.status(400).json({
          message: 'Field Should Not Be Empty',
        })
      } else {
        let isUserExists = await crudApiModel.findOne({
          _id: req.params.id,
        })
        if (isUserExists) {
          let dataUpdate = await crudApiModel.findByIdAndUpdate(
            req.params.id,
            req.body
          )
          if (dataUpdate && dataUpdate._id) {
            return res.status(200).json({
              message: 'Data updated successfully',
              data: dataUpdate,
            })
          } else {
            return res.status(400).json({
              message: 'Data not updated successfully',
              data: [],
            })
          }
        } else {
          return res.status(400).json({
            message: 'Data not Found',
            data: [],
          })
        }
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

module.exports = new crudApiController()
