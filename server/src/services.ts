// retrieve weather data from external api
const retrieveWeather = async (city: string) => {
    // const offset = helper.getOffset(page, config.listPerPage);
    // const rows = await db.query(
    //   `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    //   FROM programming_languages LIMIT ?,?`, 
    //   [offset, config.listPerPage]
    // );
    // const data = helper.emptyOrRows(rows);
    // const meta = {page};
  
    // return {
    //   data,
    //   meta
    // }
    console.log('made it to services')
    return {'test': 'string from services.js'}
  }

  export default retrieveWeather