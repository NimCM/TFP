const dataLocations = {
    "locations":[
        {
            "id":1,
            "name": "Museu del Mar",
            "woman": "Lliberada Parés",
            "image": "../files/img/museu_mar.webp",
            "coordinates": {
                "lat": 41.699524,
                "lng": 2.850787
            },
            "tipus": ["museu","interior"],
            "temps":"0 mins",
            "price": "pagament",
            "access": "accessible"
        }, 
        {
            "id":2,
            "name": "Dona Marinera",
            "woman": "Sra Margarita Puig Esqueu",
            "image": "../files/img/dona_marinera_tochange.jpg" ,
            "coordinates": {
                "lat":41.695193363493644, 
                "lng":2.844887902220333
            },
            "tipus": ["escultura", "exterior"],
            "temps":"20 mins",
            "price": "gratuit",
            "access": "no_accessible"
        },
        {
            "id":3,
            "name": "Castell St Joan",
            "woman": "Sicardis de Montsoriu",
            "image": "../files/img/castell_joan.webp",
            "coordinates": {
                "lat":41.693890531324804,
                "lng":2.839347646389623
            },
            "tipus": ["ruinas", "exterior"],
            "temps":"20 mins",
            "price": "pagament",
            "access": "no_accessible"
        },
        {
            "id":4,
            "name": "Jardins de Sta Clotilde",
            "woman": "Clotilde de Rocamora",
            "image": "../files/img/santa_clotilde_tochange.jpeg",
            "coordinates": {
                "lat":41.693784129153016, 
                "lng":2.8248975845096025
            },
            "tipus": ["natural", "exterior"],
            "temps":"30 mins",
            "price": "pagament",
            "access": "accessible"
        },
        {
            "id":5,
            "name": "Escultures Sirenes",
            "woman": "Maria Llimona i Benet",
            "image": "../files/img/sirenes.jpg",
            "coordinates": {
                "lat":41.691496, 
                "lng":2.825818
            },
            "tipus": ["monument", "exterior"],
            "temps":"2 mins",
            "price": "pagament",
            "access": "accessible"
        },
        {
            "id":6,
            "name": "Ermita Sta Cristina",
            "woman": "Santa Cristina",
            "image": "../files/img/sta_cristina.jpg",
            "coordinates": {
                "lat":41.68782400415335,
                "lng":2.8162711972034855
            },
            "tipus": ["natural","religios","exterior"],
            "temps":"35 mins",
            "price": "gratuit",
            "access": "no_accessible"
        },
        {
            "id":7,
            "name": "St Pere del Bosc",
            "woman": "Dolors Montserdà",
            "image":"../files/img/st_pere_bosc_tochange.jpg",
            "coordinates": {
                "lat":41.71192359661002,
                "lng":2.7904884731616324
            },
            "tipus": ["natural","exterior"],
            "temps":"45 mins",
            "price": "gratuit",
            "access": "accessible"
        },
        {
            "id":8,
            "name": "Barri de la Càndida",
            "woman": "Càndida Masgrau i Campeny",
            "image": "../files/img/candida-masgrau.jpg",
            "coordinates": {
                "lat":41.705496,
                "lng":2.833148
            },
            "tipus": ["urba","exterior"],
            "temps":"35 mins",
            "price": "gratuit",
            "access": "accessible"
        },
        {
            "id":9,
            "name": "Ermita de les Alegries",
            "woman": "Senyora del Rossell",
            "image": "../files/img/ermita-alegries.jpg",
            "coordinates": {
                "lat":41.71768614341468,
                "lng":2.8294887141102607
            },
            "tipus": ["religios","exterior"],
            "temps":"35 mins",
            "price": "gratuit",
            "access": "accessible"
        },
        {
            "id":10,
            "name": "Escola Àngels Alemany i Boris",
            "woman": "Àngels Alemany i Boris",
            "image": "../files/img/escola-angels.jpg",
            "coordinates": {
                "lat":41.70571581907457,
                "lng":2.8387768413824745
            },
            "tipus": ["urba", "exterior","edifici"],
            "temps":"25 mins",
            "price": "gratuit",
            "access": "accessible"
        },
        {
            "id":11,
            "name": "Barri del Rieral",
            "woman": "Gertrudis Moret i Farigola",
            "image": "../files/img/getrudis-2.jpeg",
            "coordinates": {
                "lat":41.70549881041903, 
                "lng":2.8378980955553175
            },
            "tipus": ["urba","exterior"],
            "temps":"2 mins",
            "price": "gratuit",
            "access": "accessible"
        },
        {
            "id":12,
            "name": "Biblioteca",
            "woman": "Antònia Pares i Macià",
            "image": "../files/img/biblio.jpg",
            "coordinates": {
                "lat":41.70137353704667,
                "lng":2.8450136015178247
            },
            "tipus": ["edifici", "exterior", "interior"],
            "temps":"15 mins",
            "price": "gratuit",
            "access": "accessible"
        },
        {
            "id":13,
            "name": "Carrer Venècia",
            "woman": "Rosita Mistos",
            "image": "../files/img/dona_marinera_tochange.jpg",
            "coordinates": {
                "lat":41.70073994037073,
                "lng":2.852665029935177
            },
            "tipus": ["urba","exterior"],
            "temps":"20 mins",
            "price": "gratuit",
            "access": "accessible"
        }
    ],
    "filters": {
        "tipus": [
            { "value": "interior", "label": "Interior" }, 
            { "value": "exterior", "label": "Exterior" }, 
            { "value": "museu", "label": "Museu" },
            { "value": "escultura", "label": "Escultura" },
            { "value": "ruines", "label": "Ruines històriques" },
            { "value": "natural", "label": "Espai natural" },
            { "value": "religios", "label": "Espai religiós" },
            { "value": "urba", "label": "Espai urba" },
            { "value": "edifici", "label": "Edificació" }
        ],
        "price": [
        { 
            "value": "gratuit", 
            "label": "Gratuït",
            "icon": "./css/icons/access/gratuit_light.png"
        },
        { 
            "value": "pagament", 
            "label": "De pagament",
            "icon": "./css/icons/access/preu_light.png"
        }

        ],
        "access": [
        { 
            "value": "accessible", 
            "label": "Accessible",
            "icon": "./css/icons/access/cadira_light.png"
        },
        { 
            "value": "no_accessible", 
            "label": "No accessible",
            "icon": "./css/icons/access/no_accessible_light.png"
        }
        ]
    }
};
