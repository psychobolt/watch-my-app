# Watch My App

Watch My App is a framework for desktop and mobile for gathering network latency of web services and alerting on any violations.

![alt text](https://github.com/psychobolt/watch-my-app/raw/master/dashboard.png "Endpoint Dashboard")

## Development

This is a extended project of [Angular 2 Seed Advanced](https://github.com/NathanWalker/angular2-seed-advanced) framework.
Please see the Angular 2 Seed Advanced project for information on running developement and production modes as well as development guides.
The main implementation of the endpoint polling mechanism utilizes mainly Angular 2's services and the @ngrx/effect framework. Most of the sources are under the 'monitor' frameworks directory. e.g. src/client/app/frameworks/monitor.

## Requirements

Please see Angular 2 Seed Advanced framework. 

## Startup

Clone repository and run npm install. Please see App Configuration section before starting up the application.

### Local Service

After successfully running ```npm install```, run ```npm run serve.prod```. Verify by going pointing your browser to [http://localhost:5555/]()

### Desktop

Coming soon.

### IOS/Android Emulator

Coming soon.

## App Configuration

Below are required steps in order for the application to run successfully.

### Firebase

- Create a new project in [Firebase](firebase.google.com) e.g. 'watch-my-app'.
- Under Firebase's dashboard, go to Database and configure Rules as follows: 
```json
"rules": {
  ".read": "true",
  ".write": "true"
}
```
- Go to the Overview dashboard, add a Web app. A modal dialog should give you scripts to enable Firebase inside the web app.
- Copy the given configuration, and create firebase-config.json in <b>dist/prod/app/assets</b> of the watch-my-app project.
- You should add your configuration as JSON into the file.

### Segment (Optional)

- Create a [Segment](www.segment.com) account.
- Follow setup up instructions under the tutorial.
- Copy the provided API key and replace in <b>src/client/app/index.html</b> script section, see below e.g.
```javascript
<!-- segment.io -->
<script type="text/javascript">
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";

// REPLACE with your Segment.io write_key
analytics.load("API_KEY");
analytics.page();
}}();
</script>
```

## Rules Configuration

The following show some rules that can be configured in order to generate reports. More rules will be added soon.
Please see <b>src/client/assets/rules.json</b> for example. Rules can be applied to any data property. 
Currently the only data property that can be applied is __endpoint__.

### Properties

#### Notifications

Describes reports that should be notified or tracked. Notifications poll constantly for reports to send.

- inverval 
  - __startTime__ (optional): \<number | string> If you require a offset time when 
  - __duration__: \<string | Duration>. How often to perform report checking. Can be a string e.g. HH:MM:ss.mmm.
- __emails__: \<Array<String |> |> Emails that should receive the generated reports
- __reportTypes__: \<Array<String>>

#### Duration Types

Supported number properties:

- __seconds__: \<number>
- __minutes__: \<number>
- __hours__: \<number>
- __days__: \<number>
- __weeks__: \<number>
- __months__: \<number>
- __years__: \<number>

#### Report Types

- __Violations__
- __Fixed__

#### Rule Types

All rules require a property

- __ChangeRule__
- __LimitRule__

### Rules

All rules required rules

- __type__: \<string> See Rule Types.
- __property__: \<string> The property name that the rule should be applied to.
- __reportType__: \<string> See Report Type.

#### Change Rule

Assert that value changes

- __oldValue__ \<string | number>
- __newValue__ \<string | number>

#### Limit Rule

Coming soon.

## SMTP Configuration

Coming soon.
