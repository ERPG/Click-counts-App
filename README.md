[![Skylab](https://github.com/FransLopez/logo-images/blob/master/logos/skylab-56.png)](http://www.skylabcoders.com/)

[![HTML5, CSS3 and JS](https://github.com/Iggy-Codes/logo-images/blob/master/logos/html5-css3-js.png)](https://www.w3.org/)
[![AngularJS](https://github.com/FransLopez/logo-images/blob/master/logos/angularjs.png)](https://angularjs.org/)
[![NodeJS](https://github.com/FransLopez/logo-images/blob/master/logos/nodejs.png)](https://nodejs.org/)
[![MongoDB](https://github.com/FransLopez/logo-images/blob/master/logos/mongodb.png)](https://www.mongodb.com/)
[![npm](https://github.com/Iggy-Codes/logo-images/blob/master/logos/npm.png)](https://www.npmjs.com/)
[![Bootstrap](https://github.com/FransLopez/logo-images/blob/master/logos/bootstrap.png)](http://getbootstrap.com/)
[![Bower](https://github.com/FransLopez/logo-images/blob/master/logos/bower.png)](https://bower.io/)
[![SASS](https://github.com/FransLopez/logo-images/blob/master/logos/sass.png)](http://sass-lang.com/)  
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Click-count-app
A Web application to look for compare products prices in the most wanted websites of the country.

## Installation
You need to have installed [NodeJS](https://nodejs.org/) with [npm](https://www.npmjs.com/), [bower](https://bower.io/) and [MongoDB](https://www.mongodb.com/)

### Configuration `env` file
You need to create an **.env** file in the project root with the following environment variables configured:
- Port:
```
    PORT=3000
```

- Mongodb path and database to use:
```
    DB_URI=mongodb://localhost:27017/NAME_DB
```

- Secret word to encrypt users' passwords:
```
    SECRET=XXXXXXXXXXXXXXXXXXXXXX
```

- API key from Ebay to get Json of Products
```
    Ebay_API_KEY=XXXXXXXXXXXXXX
```

### To run the server:
```
    npm start
```
All dependencies will be installed automatically

### Websites to data Consult:

in the word [KEYWORD] you can use your query search

- https://svcs.ebay.com/services/search/FindingService/v1?SECURITY-APPNAME=${EBAY_API_KEY}&OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&RESPONSE-DATA-FORMAT=JSON&callback=_cb_findItemsByKeywords&REST-PAYLOAD&keywords=[KEYWORD]&paginationInput.entriesPerPage=6&GLOBAL-ID=EBAY-ES&siteid=186

- http://www.carrefour.es/global/?Dy=1&Nty=1&Ntt=[KEYWORD]&search=

- https://www.elcorteingles.es/search/?s=[KEYWORD]

- http://busqueda.fnac.es/SearchResult/ResultList.aspx?SCat=0%211&Search=[KEYWORD]&sft=1&sa=0

- http://www.solostocks.com/venta-productos/[KEYWORD]_b
