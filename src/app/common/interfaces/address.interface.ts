import { mapObject } from '../utils';
import { Region, regionMap, defaultRegion, toRegion, getCountry } from './region.interface';

export interface Address extends Region {
    AddressLine1: string | null;
    AddressLine2: string | null;
    City: string | null;
    PostalCode: string | null;  
    Latitude?: number | null;
    Longitude?: number | null;
  }
  
  export const defaultAddress: Object = Object.assign({},
    defaultRegion,
    {
      AddressLine1: null,
      AddressLine2: null,
      City: null,
      PostalCode: null,    
      Latitude: null,
      Longitude: null
    })
  
  
  
  export const addressMap: Object = Object.assign({},
    regionMap,
    {
      AddressLine1: ['Line1', 'AddressLine1'],
      AddressLine2: ['Line2', 'AddressLine2'],
      City: [],
      PostalCode: ['ZipCode', 'Zip'],    
      Latitude: [],
      Longitude: []
    })
  
  
  export function toAddress(data: Object = {}): Address {    
    let address = mapObject(data, addressMap, defaultAddress) as Address;   
    let country = getCountry(address.CountryCode,address.CountryName);  
    address.CountryCode = country.CountryCode;
    address.CountryName = country.CountryName;     
    return address;
  }