
<div id="table-of-contents">
<h2>Table of Contents</h2>
<div id="text-table-of-contents">
<ul>
<li><a href="#sec-1">1. Introduction</a></li>
<li><a href="#sec-2">2. Setup and Configuration</a></li>
<li><a href="#sec-3">3. MVC 4 Music Store</a></li>
<li><a href="#sec-4">4. Setting up Okta</a></li>
<li><a href="#sec-5">5. Using Okta to authenticate your Music Store users</a></li>
<li><a href="#sec-6">6. Accessing Okta user profile data from the Music Store</a></li>
<li><a href="#sec-7">7. Managing your users and groups from inside the Music Store</a></li>
<li><a href="#sec-8">8. Set up contextual navigation links to the Music Store</a></li>
<li><a href="#sec-9">9. <i>Optional:</i> Adding Single-sign on to your Music Store</a></li>
<li><a href="#sec-10">10. Closing</a></li>
</ul>
</div>
</div>



# Introduction<a id="sec-1" name="sec-1"></a>

This project is a demonstration of how to add Okta as an identity
provider for an existing application. 

Rather than concoct an example, I wanted to use an
existing sample application that more accurately represents what a
real-world application would look like. To that end, the sample
application that I selected is the [MVC Music Store](https://mvcmusicstore.codeplex.com/), which you're
probably familiar with if you're a .NET developer.

The MVC Music Store is a sample application that is also an
introduction to the [open source](https://www.asp.net/open-source) [ASP.NET web application framework](https://www.asp.net/). 

In this document, I will show you how to modify a completed
MVC Music Store application to use Okta for login, registration,
Single Sign-on, as well as user and group management.

I suggest following this document from beginning to end, as each
section builds upon the last. 

# Setup and Configuration<a id="sec-2" name="sec-2"></a>

Before you get started, you'll need to install or set up the
software and services below:

1.  Download and install [Visual Studio Express 2013 for Web](http://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx).
    
    At the time that I write this (November 2014), this is the most
    recent version of Visual Studio available.
2.  Sign up for [Okta Developer Edition](http://developer.okta.com/).
    
    You'll need an Okta "organization" of your own to use as you follow
    this gude.
3.  *Optional:* Sign up for a [30 day free trial of Zendesk](https://www.zendesk.com/register).
    
    This isn't strictly required. If you want to see how Okta enables you
    to seamlessly integrate 3rd party applications, then I
    suggest signing up for Zendesk, which is the application I use to
    demonstrate seamless single sign-on in this guide.
4.  *Optional:* Sign up for a [free trial of Microsoft Azure](http://azure.microsoft.com/en-us/pricing/free-trial/).
    
    This isn't required either. This guide assumes that you'll be
    following along using Visual Studio on your personal
    computer. However, if you want to host your code somewhere
    public-facing, then Azure is the easiest place to do that.

# MVC 4 Music Store<a id="sec-3" name="sec-3"></a>

This project builds upon the excellent MVC Music Store
application. *However* this in this example I use "Visual Studio
Express 2013 for Web" and ASP.NET MVC 4, *not* "Visual Web Developer 2010
Express SP1" and ASP.NET MVC 3 as is used in the MVC Music Store
example. At the time that I write this (November 2014), Visual
Studio Express 2013 for Web is the most recent freely available
version of Visual Studio Express.

Although they were written for MVC 3, the MVC Music Store
instructions still work with MVC 4, with a few key differences:

-   **Your project must be created with the ASP.NET MVC 4 "Internet"
    project template**. Not the "Empty" project template as the MVC
    Music Store instructions suggest for MVC 3.
-   MVC 4 no longer has the built-in "ASP.NET Configuration
    website", so you'll need to create the users and groups mentioned
    in "Part 7: Membership and Authorization" using a different
    technique.
-   You will need to add a <code>[InitializeSimpleMembership]</code> attribute
    after the <code>[Authorize(Roles = "Administrator")]</code> attribute
    mentioned in "Part 7: Membership and Authorization".

I cover these differences in more detail in the section below.

## Building the MVC Music Store<a id="sec-3-1" name="sec-3-1"></a>

Here is how to get set up on your own computer with Visual Studio
Express 2013 for Web and a working version of the MVC Music Store
for MVC 4:

1.  Download and install [Visual Studio Express 2013 for Web](http://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx).
2.  Except for the changes listed below, follow the [MVC 3 Music Store](http://www.asp.net/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-1)
          instructions.
3.  If you don't want to spend the time to go through the MVC 3 Music
    Store instructions, a completed version of the project is
    included with this project.

## Things to do differently when building the MVC Music Store for ASP.NET MVC 4<a id="sec-3-2" name="sec-3-2"></a>

Here are the things that you'll need to do differently when
building the MVC Music Store for MVC 4. The changes you'll need to
make are grouped according to the part of the MVC Music Store
instructions where you'll need to make the changes.

### Changes needed in [Part 1: Overview and File→New Project](http://www.asp.net/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-1)<a id="sec-3-2-1" name="sec-3-2-1"></a>

This is the very first part of the MVC Music Store instructions, they
cover what you'll be doing and how to get started. You'll need to
make the following changes in this part of the instructions:

1.  In the section named "Installing the software":

    -   You will be downloading [Visual Studio Express 2013 for Web](http://www.visualstudio.com/en-us/products/visual-studio-express-vs.aspx) instead of the tools listed in this section.

2.  In the section named "Creating a new ASP.NET MVC 3 project":

    -   You will be creating an "ASP.NET MVC 4 Web Application" project. I use the name
        "Mvc4MusicStore" in this document, but you can name your project
        whatever you want.
    -   **Very important: You must select "Internet Application" as the project
        template** for your application. 
        <br />
        You'll run into issues in Part 7 if you don't!
        <br />
        
        ![img](./Documentation/Images/new-mvc4-project.png "Creating a new ASP.NET MVC 4 Project with the "Internet Application" template selected")

### Changes needed in [Part 7: Membership and Authorization](http://www.asp.net/mvc/overview/older-versions/mvc-music-store/mvc-music-store-part-7)<a id="sec-3-2-2" name="sec-3-2-2"></a>