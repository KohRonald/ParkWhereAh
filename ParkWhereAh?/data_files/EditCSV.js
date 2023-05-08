const csv = require('csv-parser');
const fs = require('fs');
const proj4 = require('proj4');
const Papa = require('papaparse');
const cheerio = require('cheerio');

CSV_FILE = './hdb-carpark-information.csv'
OUTPUT_CSV_FILE='../src/api/updated-hdb-carpark-information.csv'
OUTPUT_JSON_FILE='../src/api/updated-hdb-carpark-information.json'

const addCoordsToHDBCarparkCSV = async (csvFile) => {
    try {

      /*
      Get table from url and store the data into array
      get values from hdb carpark information csv file and store them into new csv file
      with new columns of combinedcoords, convertedcombinedcoords, and central
      those carpark from central will be store in the array to be checked when saved into new csv file
      */
      const url = "https://www.hdb.gov.sg/car-parks/shortterm-parking/short-term-parking-charges"
      const centralCarparks = [];

      fetch(url)
        .then(response => response.text())
        .then(html => {
          const $ = cheerio.load(html);
          const table = $('table').eq(1);
          const rows = table.find('tr');

          rows.each((i, row) => {
            const cells = $(row).find('td');
            const value = $(cells[0]).text().trim();
            
            if(value !== ''){
              centralCarparks.push(value);
            }
          });
          console.log("Inside: ", centralCarparks);

          console.log(centralCarparks);

          const writeStream = fs.createWriteStream(OUTPUT_CSV_FILE)
          writeStream.write('"car_park_no","address","x_coord","y_coord","car_park_type","type_of_parking_system","short_term_parking","free_parking","night_parking","car_park_decks","gantry_height","car_park_basement","combined_coords","converted_combined_coords","central"\n');

          fs.createReadStream(csvFile)
            .pipe(csv())
            .on('data', (row) => {
              const combinedCoords = `${row.y_coord} ${row.x_coord}`
              const convertCombinedCoords = convertCoordsFormat(combinedCoords)    
              const isCentral = centralCarparks.includes(row.car_park_no) ? "Yes" : "No";           

              const newRow = (`"${row.car_park_no}","${row.address}","${row.x_coord}","${row.y_coord}","${row.car_park_type}","${row.type_of_parking_system}","${row.short_term_parking}","${row.free_parking}","${row.night_parking}","${row.car_park_decks}","${row.gantry_height}","${row.car_park_basement}","${combinedCoords}","${convertCombinedCoords.join(' ')}","${isCentral}"\n`);

              writeStream.write(newRow)
            })
            .on('end', () => {
                console.log("Done")
                writeStream.end()
            })
        })
      } catch(err) {
        console.log("Error in addCoordsToHDBCarparkCSV function: ", err)
      }
}

const addCoordsToHDBCarparkJSON = async (jsonFile) => {

    fs.readFile(OUTPUT_CSV_FILE, 'utf-8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        
        const options = {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
        };
        
        const results = Papa.parse(data, options).data;
        
        fs.writeFile(jsonFile, JSON.stringify(results, null, 2), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          
          console.log(`JSON file saved to ${jsonFile}`);
        });
      });
}


/*
Coords from hdb carpark information is in SVY21 format
Coords from OneMap API is in WGS84 format
ESPG:3414 is SVY21
ESPG:4326 is WGS84

Written with the help of proj4 libary: https://github.com/proj4js/proj4js
*/
const convertCoordsFormat = (combinedCoords) => {
    let tempList = combinedCoords.split(' ')
    let x = parseFloat(tempList[1])
    let y = parseFloat(tempList[0])

    proj4.defs('EPSG:3414', "+proj=tmerc +lat_0=1.36666666666667 +lon_0=103.833333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs");
    proj4.defs('ESPG:4326', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees")
    let svy21Coords = [x, y]

    try {
        let wgs84Coords = proj4('EPSG:3414', 'ESPG:4326').forward(svy21Coords, true)
        return wgs84Coords

    } catch (e) {
        console.log("E: " + e)
        console.log("E: " + e.error)
    }

}

/*
Store the new csv and converts into JSON
*/
addCoordsToFileAndconvertFileFormat = async() => {

  console.log("Processing file and adding Coords...")
  await addCoordsToHDBCarparkCSV(CSV_FILE)
  console.log("Done!")

  console.log("Convering file into JSON...")
  await addCoordsToHDBCarparkJSON(OUTPUT_JSON_FILE)
  console.log("Done!")
}

//run on commandline with Node EditCSV.js
addCoordsToFileAndconvertFileFormat()