const Sequelize = require('sequelize');
const { parse } = require('date-fns');
const { INTEGER } = require('sequelize');
const moment = require('moment');

class Holiday extends Sequelize.Model {
  static init(sequelize) {
    super.init({      
      name: Sequelize.STRING,
      ibgeCode: Sequelize.STRING,
      date: Sequelize.STRING,
    }, 
    { 
      sequelize 
    });

    return this;
  }

  static getNameHolidayByUrl(url) {
    let name = null;

    switch (url) {
      case 'corpus-christi':
          name = 'Corpus Christi';
        break;
      case 'carnaval':
        name = 'Carnaval';
        break;      
    }

    return name;
  }

  static calcHolidayVariable(name, year) {
    let dateHoliday = null;

    switch (name) {        
      case 'Corpus Christi':
        dateHoliday = this.calcCorpusChristiDate(year);
        break;
      
      case 'Carnaval':
        dateHoliday = this.calcCarnivalDate(year);
        break;
      
      case 'Sexta-Feira Santa':
        dateHoliday = this.calcGoodFriday(year);
    }

    return dateHoliday;
  }

  static calcGoodFriday(year) {
    const dateEaster = this.calcEasterDate(year);

    let dateGoodFriday = moment(year+'-'+dateEaster);
    
    dateGoodFriday.add(-2, 'days');

    return dateGoodFriday
  }
  
  static calcCarnivalDate(year) {
    const dateEaster = this.calcEasterDate(year);
    
    let dateCarnival = moment(year+'-'+dateEaster);
    
    dateCarnival.add(-47, 'days');

    return dateCarnival;
  }

  static calcCorpusChristiDate(year) {
    const dateEaster = this.calcEasterDate(year);
    
    let dateCorpus = moment(year+'-'+dateEaster);
    
    dateCorpus.add(60, 'days');

    return dateCorpus;
  }

  static calcEasterDate(year)
  {
    const a = this.mod(year, 19);
    const b = parseInt(year / 100);
    const c = this.mod(year, 100);
    const d = parseInt(b / 4);
    const e = this.mod(b, 4);
    const f = parseInt((b + 8) / 25);
    const g = parseInt((b - f + 1) / 3);
    const h = this.mod((19 * a + b - d - g + 15), 30);
    const i = parseInt(c / 4);
    const k = this.mod(c, 4);
    const L = this.mod((32 + 2 * e + 2 * i - h - k), 7);
    const m = parseInt((a + 11 * h + 22 * L) / 451);
    let month = parseInt((h + L - 7 * m + 114) / 31);
    let day = this.mod(1+ (h + L - 7 * m + 114), 31);
    month = parseInt(month);
    day = parseInt(day);
    return month+'-'+ day;
  }

  static mod(x, y) {    
    return ((x % y) + y) % y
  }
}

module.exports = Holiday;
