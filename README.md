## Getting started

![](./docs/solution.png)

### 1. Config

To get the scraper running you'll need some API keys from:

- The Movide DB
- Trakt

Paste the API keys in the `scraper/.env` file

```
TRAKT_API_KEY=<your api key>
TMDB_API_KEY=<your api key>
```

Also add the following lines to the `scraper/.env` file

```
LOGSTASH_URL="http://logstash:8080/"
```

### 2. Build images

Before starting the services you will need to build some images.  
You can build them by running `docker-compose build`

### 3. Running the services

Now you're ready to start the services by running `docker-compose up`

## Notes

```
Case 6: Media – Metadata Hub
In our fourth Media case, you'll be challenged to bring together all kinds of metadata about content together in one hub.
MEDIAGENIX is in the process of building content intelligence applications, that can help the world’s biggest media companies make smart decisions around which content they should buy for their TV channels and streaming platforms.
```

```
Case 6: In order to make smart decisions about which content TV channels and streaming platforms should buy, it would be very useful to aggregate as much data as possible from open sources. This metadata should be brought together in one hub. This hub should then be able to be effectively used for some purposes..
```

```
case 6 is more on getting an overview of what we have in terms of rights, what ar emy competitors doing, what is being released next year, what is doing well in the netherlands. to get a basis for some intelligence to propose/recommend what I should buy or do
```

### Collect data

https://app.swaggerhub.com/apis-docs/thetvdb/tvdb-api_v_4/4.2.8#/movies/getAllMovie
http://developer.rovicorp.com/docs
https://developers.themoviedb.org/3/

Thanks Popcorntime for the api keys!
`https://github.com/popcorn-official/popcorn-desktop/blob/development/src/app/settings.js`

---

extra data:

- In hoeveel sources komt het voor? (globale populariteit)
- Voor pitch: AI Vision die film 'bekijkt' -> data uithalen

## Pitch workshop notes

### Timing

    - 5 minutes
    - grab attention early on -> start with demo ?
    - Visualise flow (progress bar)
    - exit with a bang -> end with demo? :P
    - End with 'thank you'

### Approach

    - pitch is not afterthought
    - power of 3

### Flow

    - Intro 30''
        - Intro team
        - Single speaker, mot multiple
    - problem 30''
        - Facts
        - Frustrations
    - impact 30''
        - Of solving
        - Stakeholders
    - product 60''
        - What 4 whom
        - Power of 3 again
    - show and tell 2'
        - Journey
        - Combo demo&story, real&mockup
    - wrap up 30''
        - Why awesome
        - Why viable
        - Why unique

### Other stuff

Story -> "Let me tell you how we collected data about thousands of movies and shows" ? Idk cant think of a story

Jury (ivan) is a fan of catchphrases :) -> power3

### Demo queries

```
trakt.people.cast.person.name: Brad Pitt
trakt.people.cast.person.name: Brad Pitt, genres.name: comedy
```

```
title: breaking
name: breaking
```

```
genres.name: action
```

feedback tryout pitch:

- sneller over tech diagram
- Add revenue
- SWOT korter mss
- Zeggen dat search uitgebreid kan worden
