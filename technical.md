# RetroLiber Technical Details

## 1. General Information
Liber 2.0 (hereafter just Liber) is just a really fancy "Document Library". A Document Library is a term used by Sharepoint, and is essentially analogous to a folder structure.

#### Note: the following explanation is constructed from knowledge I gained playing around with the Graph API. It may not be 100% accurate, and serves only as a basic explanation.

I should also preface this by saying that this whole project took multiple days to complete, because of the nature of Sharepoint and the permissions my account has. Sharepoint aims to make it as simple as possible for end users to use their site, but in doing so, they remove a lot of usefull information from the site when you're not on an admin account. This means I had to essentially build up a model of how Sharepoint works from only the web interface and the lacking documentation there is online. A lot of the important breakthroughs in this project were by sheer luck of finding a URL that could help me progress. A good example of this is the page "*https://coornhert-my.sharepoint.com/personal/documentbeheer_coornhert-gymnasium_nl/LIBER*". If we go up one directory to "*/personal/documentbeheer_coornhert-gymnasium_nl*" we see just a single folder called "*Coornhert*". This is the folder housing all the student-facing documents. However, you might have noticed that the "*LIBER*" folder is nowhere to be seen. That is because it is ***hidden from normal users***. School has made various *crucial folder completely invisible to student accounts*.

/rant

 There are three versions or components to a library:

1. Source version
2. Build version
3. Web version

The **source** version is just how you would lay out your documents on a regular filesystem. It is comprised of folder and files.

The **build** version in analogous to an xml document explaining the source version. The files are replaced with links to a seperate storage location. This storage location actually just the personal OneDrive account of a user by the name of "documentbeheer_coornhert-gymnasium_nl". **In fact, this is the exact same account you access when you go to Sharepoint -> OneDrive School**

The **web** version, then, is the version *you* as an end user see. This is where Liber differs from a "normal" library. What it does is instead of giving you a list of all subdirectories of a directory (as is seen when visiting the OneDrive School tile), it overwrites that page with a page called */SitePages/Introductiepagina.aspx*. This page is what you see when you click on a subject. 

## 2. Data Acquisition
Normally extracting data from a library would be relatively simple: you just make an authenticated request to sharepoint and ask for a listing of all directories. 

School, in their infinite wisdom, however, decided that was too easy. Student accounts do not have permission to access the Sharepoint API directly, and because the index pages of Liber are overwritten from the default, you can't simply download a single page and then parse it with an existing Sharepoint parses.

From here there are several options:

### 1. Manually rebuild the entire thing

This option was essentially null from the start, since i didn't want to spend all the effort. Later it would turn out that Liber consists of more than ~300 pages, so it was good that I didn't do this manually.

### 2. Recursively download pages from a headless Chrome browser

The idea here was to start at the home page of liber ("/sites/liber/SitePages/IntroductiePagina"). We then filter out all of the links we want, namely all the subjects, and click on all of them. We of course keep track of which links we've clicked. Then on every single one of those new pages, we do the same thing: find the links we want, and click on them. We do this recursively until we're 3 layers deep. At this point we've reached the maximum depth Liber offers, and we have accessed all the links. 

In theory, this option would have worked. However, there are many options that made this less than viable. First of all: I had no experience in working with headless Chrome, or controlling it. Secondly, there would have been a good chance my IP would get timed out or even blacklisted after a while, since we're making > 300 calls as fast as we can. Lastly, due to the structure of *IntroductiePagina.aspx* it was quite difficult to parse *just* the links we wanted.

### 3. The Microsoft Graph API
So after all these failed attempts i stumbled across something called the *Microsoft Graph API*. This API is essentially the holy grail of everything Sharepoint. It can interact with everything in your Sharepoint account, and can do everything and more that you can do from the web interface. 

So my first thought here was to see if I could just ask Graph for the directory listings of Liber. As it turns out however, I did not have permission to do that. **I did not have permission to ask for a directory listing of a public account.** My best guess as to why this is, is because the "*IntroductiePagina.aspx*" has its directory listing baked, as opposed to the normal version which has to use the Graph API to build its page. My guess is that since this option went unused, they just decided to turn it off.

My next discovery was the endpoint "**v1.0/sites?search**". This endpoint allows you to search for anything accesible to your Sharepoint account. Because we can search for items on Liber, I was hopeful. And **indeed**, searching for "/sites/liber" resulted in 1610 lines of glorious Liber items. Inspecting the JSON it turns out that there was a maximum number of items Graph would return. Narrowing down the search to "liber/SUBJECT" worked out fine.

I then proceeded to download the data for all subjects individually and put it into seperate files. I had now finally acquired all the data Liber had, and I was ready to start compiling it into a useable format.

## Converting the data
Now that I had all the data I needed, i started working on compiling it. The JSON from the API looked as follows:

```
"value": [
    {
        "createdDateTime": "2016-04-13T08:01:04Z",
        "id": "coornhert.sharepoint.com,[REDACTED-ID],[REDACTED-ID]",
        "lastModifiedDateTime": "2018-12-21T14:03:09Z",
        "name": "liber",
        "webUrl": "https://coornhert.sharepoint.com/sites/liber",
        "displayName": "Liber",
        "root": {},
        "siteCollection": {
            "hostname": "coornhert.sharepoint.com"
        }
    }
]
```

By this time i had already created a data structure for the site, which looks as follows:
```
"DOMAIN": {
    "SUBJECT1": {
        "MODULE1": "link",
        "MODULE2": "link"
    }
    "SUBJECT2": {
        "MODULE1": "link",
        "MODULE2": "link"
    }
}
```

I then wrote some python scripts to extract the necessary data and parse it. I started out by just grabbing the `webUrl` field and compiling them into a list. I then generate a nested `dictionary` (read: `key-value pairs`). This marked V1 of the dataset. I then started work on the UI. We'll get back to this later.

## The UI
