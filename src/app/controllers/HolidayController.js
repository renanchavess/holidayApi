const Holiday = require('../models/Holiday');
const moment = require('moment');
const { Op } = require('sequelize');

class HolidayController {

  async show(req, res) {
    const date = moment(req.params.date);
    const ibgeCode = req.params.ibgeCode;

    if(!date.isValid() || !(ibgeCode.length == 2 || ibgeCode.length == 7))
      return res.status(400).json();
    
    const holidayFix = await Holiday.findOne({
      where: {
        ibgeCode: { [Op.or]: [ null,[ibgeCode, ibgeCode.substring(0,2)]] },
        date: date.format('MM-DD'),        
      }
    });

    if(holidayFix) {
      return res.status(200).json({ name: holidayFix.name});
    }

    const holidayVariable = await Holiday.findAll({
      where: {
        date: null,
        ibgeCode: { [Op.or]: [ null,ibgeCode] },
      }
    });
    
    let nameHoliday = null;

    holidayVariable.forEach(h => {
      const dateHoliday = Holiday.calcHolidayVariable(h.name, date.format('YYYY'));

      if(dateHoliday.format('YYYY-MM-DD') === date.format('YYYY-MM-DD'))
        nameHoliday = h.name;
    });
    if(nameHoliday) {
      return res.status(200).json({ name: nameHoliday});
    }

    return res.status(404).json();
  }

  async update(req, res){
    const ibgeCode = req.params.ibgeCode;
    const dateOrName = req.params.dateOrName;
    
    if(!(ibgeCode.length == 2 || ibgeCode.length == 7))
      return res.status(400).json();
    
    if(moment( moment().format('YYYY') + '-' + dateOrName).isValid()) {
      const name = req.body.name;
      const existsHoliday = await Holiday.findOne({
        where: {
          ibgeCode: ibgeCode,
          date: dateOrName,
        }
      });

      if(!existsHoliday) {
        await Holiday.create({
          name: name,
          ibgeCode: ibgeCode,
          date: dateOrName,
        });
        
        return res.status(201).json();
      } else {                
        await existsHoliday.update({ name: name }) ;
        
        return res.status(200).json();
      }
    }   
    else {
      const nameHoliday = Holiday.getNameHolidayByUrl(dateOrName);      
      
      if(nameHoliday) {
        const holiday = await Holiday.findOne({
          where: {
            ibgeCode: ibgeCode,
            name: nameHoliday
          }
        });

        if(!holiday) {
          await Holiday.create({
            name: nameHoliday,
            ibgeCode: ibgeCode,
            date: null
          });
          return res.status(201).json();
        }
        return res.status(200).json();        
      }
      else
        return res.status(404).json();
    }
  } 

  async delete(req, res){
    const ibgeCode = req.params.ibgeCode;
    const ibgeCodeState = ibgeCode.substring(0,2);
    const dateOrName = req.params.date;
    const isDate = moment( moment().format('YYYY')+`-${dateOrName}`).isValid();

    if(!(ibgeCode.length == 2 || ibgeCode.length == 7))
      return res.status(400).json();
    
    let holiday = null;

    if(!isDate) {
      if(nameHoliday) {
        const nameHoliday = Holiday.getNameHolidayByUrl(dateOrName);
        holiday = await Holiday.findOne({
          where: {
            ibgeCode: ibgeCode,
            name: nameHoliday
          }
        });
      }      
    }
    else {
      holiday = await Holiday.findOne({
        where: {
          ibgeCode: { [Op.or]: [ null,[ibgeCodeState, ibgeCode]] },
          date: dateOrName,
        }
      });  
    }
    
    if(holiday) {
      if(holiday.ibgeCode === ibgeCode) {
        await holiday.destroy();
        return res.status(204).json();
      }
      else {
        return res.status(403).json();
      }      
    }    

    return res.status(404).json();
  }
}

module.exports = new HolidayController();