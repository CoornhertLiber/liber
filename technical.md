# RetroLiber Technical Details

# 1. General Information
Liber 2.0 (hereafter just Liber) is just a really fancy "Document Library". A Document Library is a term used by Sharepoint, and is essentially analogous to a folder structure.

### Note: the following explanation is constructed from knowledge I gained playing around with the Graph API. It may not be 100% accurate, and serves only as a basic explanation.

 There are three versions or components to a library:

1. Source version
2. Build version
3. Web version

The **source** version is just how you would lay out your documents on a regular filesystem. It is comprised of folder and files.

The **build** version in analogous to an xml document explaining the source version. The files are replaced with links to a seperate storage location. This storage location actually just the personal OneDrive account of a user by the name of "documentbeheer_coornhert-gymnasium_nl". **In fact, this is the exact same account you access when you go to Sharepoint -> OneDrive School**

The **web** version, then, is the version *you* as an end user see. This is where Liber differs from a "normal" library. What it does is instead of giving you a list of all subdirectories of a directory (as is seen when visiting the OneDrive School tile), it overwrites that page with a page called */SitePages/Introductiepagina.aspx*. This page is what you see when you click on a subject. 

# 2. Data Acquisition
Normally extracting data from a library would be relatively simple: you just make an authenticated request to sharepoint and ask for a listing of all directories. 

School, in their infinite wisdom, however, decided that was too easy. Student accounts do not have permission to access the Sharepoint API directly, and because the index pages of Liber are overwritten from the default, you can't simply download a single page and then parse it with an existing Sharepoint parses.

From here there are several options:

## 1. Manually rebuild the entire thing

This option was essentially null from the start, since i didn't want to spend all the effort. Later it would turn out that Liber consists of more than ~300 pages, so it was good that I didn't do this manually.

## 2. Recursively download pages from a headless Chrome browser

The idea here was to start at the home page of liber ("/sites/liber/SitePages/IntroductiePagina"). We then filter out all of the links we want, namely all the subjects, and click on all of them. We of course keep track of which links we've clicked. Then on every single one of those new pages, we do the same thing: find the links we want, and click on them. We do this recursively until we're 3 layers deep. At this point we've reached the maximum depth Liber offers, and we have accessed all the links. 

In theory, this option would have worked. However, there are many options that made this less than viable