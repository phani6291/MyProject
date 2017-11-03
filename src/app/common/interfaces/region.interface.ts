import { mapObject } from '../utils';
import { Selectable } from './selectable.interface';

export interface Country {
    CountryCode?: string;
    CountryName?: string;
}

export const defaultCountry: Country = {
    CountryCode: null,
    CountryName: null
}

export const CountryMap: object = {
    CountryCode: [],
    CountryName: ['Country'],
}

export function toCountry(data: Object = {}): Country {
    let country = mapObject(data, CountryMap, defaultCountry) as Country;
    return country;
}

export const COUNTRIES: Country[] = [
    { CountryName: 'Canada', CountryCode: 'CA' },
    { CountryName: 'Mexico', CountryCode: 'MX' },
    { CountryName: 'United States', CountryCode: 'US' }
];


export interface Region extends Country {
    RegionCode?: string;
    RegionName?: string;
}

export const defaultRegion: Object = Object.assign({},
    defaultCountry, {
        RegionCode: null,
        RegionName: null
    })

export const regionMap: Object = Object.assign({},
    CountryMap,
    {
        RegionCode: ['Abbreviation', 'State', 'StateAbbreviation', 'StateAbbrev', 'StateAbbr'],
        RegionName: ['StateName', 'Region'],
    }
)

export function toRegion(data: Object = {}): Region {

    let region = mapObject(data, regionMap, defaultRegion) as Region;
    let country = getCountry(region.CountryCode, region.CountryName);
    region.CountryCode = country.CountryCode;
    region.CountryName = country.CountryName;

    return region;
}

export function getCountry(countryCode: string, countryName: string) {


    if (!countryCode && !countryName) return COUNTRIES.find(c => c.CountryCode == 'US');

    if (countryCode) {
        return COUNTRIES.find(c => c.CountryCode == countryCode);
    }
    else {
        return COUNTRIES.find(c => c.CountryName == countryName);
    }

}

export function getSelectableCountries(): Selectable<Country>[] {
    return COUNTRIES.map((country) => ({
        value: country.CountryCode,
        label: country.CountryName
    }));
}

export function getSelectableRegions(countryCode?:string): Selectable<Region>[] {      
    return Regions.map(region => toRegion(region)).filter(region => region.CountryCode == countryCode).map((region) => ({
        value: region.RegionCode,
        label: region.RegionCode+'-'+region.RegionName
    }));
}



export const Regions: Region[] = 
    [
        {
            RegionName: "Alberta",
            RegionCode: "AB",
            CountryName: "Canada"
        },
        {
            RegionName: "British Columbia",
            RegionCode: "BC",
            CountryName: "Canada"
        },
        {
            RegionName: "Manitoba",
            RegionCode: "MB",
            CountryName: "Canada"
        },
        {
            RegionName: "New Brunswick",
            RegionCode: "NB",
            CountryName: "Canada"
        },
        {
            RegionName: "Newfoundland And Labrador",
            RegionCode: "NL",
            CountryName: "Canada"
        },
        {
            RegionName: "Northwest Territories",
            RegionCode: "NT",
            CountryName: "Canada"
        },
        {
            RegionName: "Nova Scotia",
            RegionCode: "NS",
            CountryName: "Canada"
        },
        {
            RegionName: "Nunavut",
            RegionCode: "NU",
            CountryName: "Canada"
        },
        {
            RegionName: "Ontario",
            RegionCode: "ON",
            CountryName: "Canada"
        },
        {
            RegionName: "Prince Edward Island",
            RegionCode: "PE",
            CountryName: "Canada"
        },
        {
            RegionName: "Quebec",
            RegionCode: "QC",
            CountryName: "Canada"
        },
        {
            RegionName: "Saskatchewan",
            RegionCode: "SK",
            CountryName: "Canada"
        },
        {
            RegionName: "Yukon",
            RegionCode: "YT",
            CountryName: "Canada"
        },
        {
            RegionName: "Aguascalientes",
            RegionCode: "AG",
            CountryName: "Mexico"
        },
        {
            RegionName: "Baja California",
            RegionCode: "BC",
            CountryName: "Mexico"
        },
        {
            RegionName: "Baja California Sur",
            RegionCode: "BS",
            CountryName: "Mexico"
        },
        {
            RegionName: "Campeche",
            RegionCode: "CM",
            CountryName: "Mexico"
        },
        {
            RegionName: "Chiapas",
            RegionCode: "CS",
            CountryName: "Mexico"
        },
        {
            RegionName: "Chihuahua",
            RegionCode: "CH",
            CountryName: "Mexico"
        },
        {
            RegionName: "Coahuila",
            RegionCode: "CO",
            CountryName: "Mexico"
        },
        {
            RegionName: "Colima",
            RegionCode: "CL",
            CountryName: "Mexico"
        },
        {
            RegionName: "Durango",
            RegionCode: "DG",
            CountryName: "Mexico"
        },
        {
            RegionName: "Federal District",
            RegionCode: "DF",
            CountryName: "Mexico"
        },
        {
            RegionName: "Guanajuato",
            RegionCode: "GT",
            CountryName: "Mexico"
        },
        {
            RegionName: "Guerrero",
            RegionCode: "GR",
            CountryName: "Mexico"
        },
        {
            RegionName: "Hidalgo",
            RegionCode: "HG",
            CountryName: "Mexico"
        },
        {
            RegionName: "Jalisco",
            RegionCode: "JA",
            CountryName: "Mexico"
        },
        {
            RegionName: "Mexico State",
            RegionCode: "ME",
            CountryName: "Mexico"
        },
        {
            RegionName: "Michoacán",
            RegionCode: "MI",
            CountryName: "Mexico"
        },
        {
            RegionName: "Morelos",
            RegionCode: "MO",
            CountryName: "Mexico"
        },
        {
            RegionName: "Nayarit",
            RegionCode: "NA",
            CountryName: "Mexico"
        },
        {
            RegionName: "Nuevo León",
            RegionCode: "NL",
            CountryName: "Mexico"
        },
        {
            RegionName: "Oaxaca",
            RegionCode: "OA",
            CountryName: "Mexico"
        },
        {
            RegionName: "Puebla",
            RegionCode: "PB",
            CountryName: "Mexico"
        },
        {
            RegionName: "Querétaro",
            RegionCode: "QE",
            CountryName: "Mexico"
        },
        {
            RegionName: "Quintana Roo",
            RegionCode: "QR",
            CountryName: "Mexico"
        },
        {
            RegionName: "San Luis Potosí",
            RegionCode: "SL",
            CountryName: "Mexico"
        },
        {
            RegionName: "Sinaloa",
            RegionCode: "SI",
            CountryName: "Mexico"
        },
        {
            RegionName: "Sonora",
            RegionCode: "SO",
            CountryName: "Mexico"
        },
        {
            RegionName: "Tabasco",
            RegionCode: "TB",
            CountryName: "Mexico"
        },
        {
            RegionName: "Tamaulipas",
            RegionCode: "TM",
            CountryName: "Mexico"
        },
        {
            RegionName: "Tlaxcala",
            RegionCode: "TL",
            CountryName: "Mexico"
        },
        {
            RegionName: "Veracruz",
            RegionCode: "VE",
            CountryName: "Mexico"
        },
        {
            RegionName: "Yucatán",
            RegionCode: "YU",
            CountryName: "Mexico"
        },
        {
            RegionName: "Zacatecas",
            RegionCode: "ZA",
            CountryName: "Mexico"
        },
        {
            RegionName: "Alabama",
            RegionCode: "AL",
            CountryName: "United States"
        },
        {
            RegionName: "Alaska",
            RegionCode: "AK",
            CountryName: "United States"
        },
        {
            RegionName: "American Samoa",
            RegionCode: "AS",
            CountryName: "United States"
        },
        {
            RegionName: "Arizona",
            RegionCode: "AZ",
            CountryName: "United States"
        },
        {
            RegionName: "Arkansas",
            RegionCode: "AR",
            CountryName: "United States"
        },
        {
            RegionName: "California",
            RegionCode: "CA",
            CountryName: "United States"
        },
        {
            RegionName: "Colorado",
            RegionCode: "CO",
            CountryName: "United States"
        },
        {
            RegionName: "Connecticut",
            RegionCode: "CT",
            CountryName: "United States"
        },
        {
            RegionName: "Delaware",
            RegionCode: "DE",
            CountryName: "United States"
        },
        {
            RegionName: "District Of Columbia",
            RegionCode: "DC",
            CountryName: "United States"
        },
        {
            RegionName: "Federated States Of Micronesia",
            RegionCode: "FM",
            CountryName: "United States"
        },
        {
            RegionName: "Florida",
            RegionCode: "FL",
            CountryName: "United States"
        },
        {
            RegionName: "Georgia",
            RegionCode: "GA",
            CountryName: "United States"
        },
        {
            RegionName: "Guam",
            RegionCode: "GU",
            CountryName: "United States"
        },
        {
            RegionName: "Hawaii",
            RegionCode: "HI",
            CountryName: "United States"
        },
        {
            RegionName: "Idaho",
            RegionCode: "ID",
            CountryName: "United States"
        },
        {
            RegionName: "Illinois",
            RegionCode: "IL",
            CountryName: "United States"
        },
        {
            RegionName: "Indiana",
            RegionCode: "IN",
            CountryName: "United States"
        },
        {
            RegionName: "Iowa",
            RegionCode: "IA",
            CountryName: "United States"
        },
        {
            RegionName: "Kansas",
            RegionCode: "KS",
            CountryName: "United States"
        },
        {
            RegionName: "Kentucky",
            RegionCode: "KY",
            CountryName: "United States"
        },
        {
            RegionName: "Louisiana",
            RegionCode: "LA",
            CountryName: "United States"
        },
        {
            RegionName: "Maine",
            RegionCode: "ME",
            CountryName: "United States"
        },
        {
            RegionName: "Marshall Islands",
            RegionCode: "MH",
            CountryName: "United States"
        },
        {
            RegionName: "Maryland",
            RegionCode: "MD",
            CountryName: "United States"
        },
        {
            RegionName: "Massachusetts",
            RegionCode: "MA",
            CountryName: "United States"
        },
        {
            RegionName: "Michigan",
            RegionCode: "MI",
            CountryName: "United States"
        },
        {
            RegionName: "Minnesota",
            RegionCode: "MN",
            CountryName: "United States"
        },
        {
            RegionName: "Mississippi",
            RegionCode: "MS",
            CountryName: "United States"
        },
        {
            RegionName: "Missouri",
            RegionCode: "MO",
            CountryName: "United States"
        },
        {
            RegionName: "Montana",
            RegionCode: "MT",
            CountryName: "United States"
        },
        {
            RegionName: "Nebraska",
            RegionCode: "NE",
            CountryName: "United States"
        },
        {
            RegionName: "Nevada",
            RegionCode: "NV",
            CountryName: "United States"
        },
        {
            RegionName: "New Hampshire",
            RegionCode: "NH",
            CountryName: "United States"
        },
        {
            RegionName: "New Jersey",
            RegionCode: "NJ",
            CountryName: "United States"
        },
        {
            RegionName: "New Mexico",
            RegionCode: "NM",
            CountryName: "United States"
        },
        {
            RegionName: "New York",
            RegionCode: "NY",
            CountryName: "United States"
        },
        {
            RegionName: "North Carolina",
            RegionCode: "NC",
            CountryName: "United States"
        },
        {
            RegionName: "North Dakota",
            RegionCode: "ND",
            CountryName: "United States"
        },
        {
            RegionName: "Northern Mariana Islands",
            RegionCode: "MP",
            CountryName: "United States"
        },
        {
            RegionName: "Ohio",
            RegionCode: "OH",
            CountryName: "United States"
        },
        {
            RegionName: "Oklahoma",
            RegionCode: "OK",
            CountryName: "United States"
        },
        {
            RegionName: "Oregon",
            RegionCode: "OR",
            CountryName: "United States"
        },
        {
            RegionName: "Palau",
            RegionCode: "PW",
            CountryName: "United States"
        },
        {
            RegionName: "Pennsylvania",
            RegionCode: "PA",
            CountryName: "United States"
        },
        {
            RegionName: "Puerto Rico",
            RegionCode: "PR",
            CountryName: "United States"
        },
        {
            RegionName: "Rhode Island",
            RegionCode: "RI",
            CountryName: "United States"
        },
        {
            RegionName: "South Carolina",
            RegionCode: "SC",
            CountryName: "United States"
        },
        {
            RegionName: "South Dakota",
            RegionCode: "SD",
            CountryName: "United States"
        },
        {
            RegionName: "Tennessee",
            RegionCode: "TN",
            CountryName: "United States"
        },
        {
            RegionName: "Texas",
            RegionCode: "TX",
            CountryName: "United States"
        },
        {
            RegionName: "Utah",
            RegionCode: "UT",
            CountryName: "United States"
        },
        {
            RegionName: "Vermont",
            RegionCode: "VT",
            CountryName: "United States"
        },
        {
            RegionName: "Virgin Islands",
            RegionCode: "VI",
            CountryName: "United States"
        },
        {
            RegionName: "Virginia",
            RegionCode: "VA",
            CountryName: "United States"
        },
        {
            RegionName: "Washington",
            RegionCode: "WA",
            CountryName: "United States"
        },
        {
            RegionName: "West Virginia",
            RegionCode: "WV",
            CountryName: "United States"
        },
        {
            RegionName: "Wisconsin",
            RegionCode: "WI",
            CountryName: "United States"
        },
        {
            RegionName: "Wyoming",
            RegionCode: "WY",
            CountryName: "United States"
        },
        {
            RegionName: "Armed Forces - Americas",
            RegionCode: "AA",
            CountryName: "United States"
        },
        {
            RegionName: "Armed Forces - Europe/Africa/Canada",
            RegionCode: "AE",
            CountryName: "United States"
        },
        {
            RegionName: "Armed Forces - Pacific",
            RegionCode: "AP",
            CountryName: "United States"
        }
    ];


