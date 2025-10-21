{
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' https://graphql.anilist.co; connect-src 'self' https://graphql.anilist.co; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "Permissions-Policy",
            "value": "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ]
  }
  