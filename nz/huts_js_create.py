#!/usr/bin/python3
#
# create Doc huts Javascript file from original GeoJSON
#
# https://catalogue.data.govt.nz/dataset/doc-huts1
#

import json
import requests

if __name__ == "__main__":
    """ parse DOC huts original GeoJSON and create huts.js file """

    # download GeoJSON
    print("downloading GeoJSON ...")
    res = requests.get("https://doc-deptconservation.opendata.arcgis.com/datasets/7f7321caf77b4101b9573db4575dd794_0.geojson?outSR=%7B%22latestWkid%22%3A2193%2C%22wkid%22%3A2193%7D")

    # parse GeoJSON and collect data
    result = []
    for rec in res.json()["features"]:
        # append "simplified" record to results array
        result.append({
            "name": rec["properties"]["name"],
            "info": rec["properties"]["facilities"],
            "region": "%s, %s" % (
                rec["properties"]["region"],
                rec["properties"]["place"],
            ),
            "image": rec["properties"]["introductionThumbnail"],
            "link": rec["properties"]["staticLink"],
            "bookable": True if rec["properties"]["bookable"] == "Yes" else False,
            "open": True if rec["properties"]["status"] == "OPEN" else False,
            "lat": round(rec["geometry"]["coordinates"][1], 5),
            "lng": round(rec["geometry"]["coordinates"][0], 5)
        })

    # write results to file
    with open("huts.js", "w") as outfile:
        outfile.write("const HUTS = ")
        json.dump(result, outfile)
        outfile.write(";")
        print("created %s" % outfile.name)