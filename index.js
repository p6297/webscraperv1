//importing pacakages
import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs"; //this is a built-in package.. no need to install fs


const GetFormulOneDrivers = async() => {
    try {
        const YourUrl = process.env.URL
        const response = await fetch(YourUrl); //fetching the data
        const htmlFormat = await response.text(); //converting the data into text format. 
        
        const $ = cheerio.load(htmlFormat); //holdss the data into $ variable

       /*  const wrapper = $(".row");
        console.log(wrapper.length);
         */

        const data = [];
        $(".listing-items--wrapper > .row > .col-12").map((index,elements)=> { //grabs the elements and iterinng through them.

            //accessing datas by grabbing classnames
            const rank = $(elements).find(".rank").text();
            const points = $(elements).find(".points > .f1-wide--s ").text();
            const firstName = $(elements).find(".listing-item--name span:first").text();
            const lastName = $(elements).find(".listing-item--name span:last").text();
            const team = $(elements).find(".listing-item--team").text();
            const image = $(elements).find(".listing-item--photo img").attr("data-src");

        data.push({  //pushing all the items into an array
            firstName,
            lastName,
            image,
            team,
            rank,
            points


        })
        fs.writeFileSync("Formula1.json",JSON.stringify(data),function(err) { //saving the file into the local storage
            if(err) return console.log(err.message);
            console.log("File Created Successfully..")
        })
           


           
        })
    } catch (error) { //handling errors
        console.log(error.message);
    }

}

GetFormulOneDrivers(); //function call
