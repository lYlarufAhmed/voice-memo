import TransparentModal from './TransparentModal';
import React, { useState } from 'react';

export default function Footer() {
  const [openModal, setOpenModal] = useState(false);
  const [contentType, setContentType] = useState(null);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = type => {
    setContentType(type);
    setOpenModal(true);
  };

  const getModalContent = () => {
    switch (contentType) {
      case 'privacy':
        return (
          <article>
            This privacy policy describes the collection, use, protection, disclosure, correction and
            deletion of your personal information by ChurchButton. Please take a moment to read the
            following to learn more about our information practices, including what type of information is
            gathered, how the information is used and for what purposes, to whom we disclose the
            information, and how we safeguard your personal information. Your privacy is a priority at
            ChurchButton, and we go to great lengths to protect it.
            <br />
            <br />
            This privacy policy applies to the websites located at faithmo.com and any subsite of the
            Faithmo domain, including all subpages and successor pages, as well as all software and services
            that we offer, including but not limited to those services that we offer through our websites
            when you register for a ChurchButton account (collectively referred to as the “ChurchButton
            Account Services”).
            <br />
            <br />
            ChurchButton may update its privacy policy from time to time. When we change the policy in a
            material way a notice will be posted on our website along with the updated privacy policy.
            <br />
            <br />
            WHY WE COLLECT PERSONAL INFORMATION
            <br />
            <br />
            We collect your personal information because:
            <ul>
              <li>It helps ChurchButton deliver and administrate your ChurchButton Account Services;</li>
              <li>It helps ChurchButton deliver a superior level of customer service;</li>
              <li>
                It enables ChurchButton to give you convenient access to our products and services and focus
                on categories of greatest interest to you;
              </li>
              <li>
                It helps ChurchButton keep you posted on the latest product announcements, software updates,
                special offers, and events that you might like to hear about. If you do not want
                ChurchButton to keep you up to date with ChurchButton news, software updates and the latest
                information on products and services please send an email request to info@faithmo.com.
              </li>
            </ul>
            <br />
            <br />
            WHAT INFORMATION WE COLLECT, WHEN WE COLLECT IT, AND HOW WE MAY USE IT
            <br />
            <br />
            If you wish to utilize ChurchButton Account Services, ChurchButton needs your information for
            purposes of processing and transmitting information to drive the correct data and content
            between servers and apps for your experience.
            <br />
            <br />
            Also, there are a number of situations in which your personal information may help us give you
            better service. For example:
            <br />
            <br />
            <ul className="privacy-p">
              <li>
                We may ask for your personal information when you’re discussing a service issue on the phone
                with an associate, downloading a software update, registering for a seminar, participating
                in an online survey, registering your products, or purchasing a product;
              </li>
              <li>
                When you interact with ChurchButton, we may collect personal information relevant to the
                situation, such as your name, mailing address, phone number, email address, and contact
                preferences; your credit card information and information about the ChurchButton products
                you own, such as their serial numbers and date of purchase; and information relating to a
                support or service issue;
              </li>
              <li>
                We collect information regarding customer activities on our websites and applications. This
                helps us to determine how best to provide useful information to customers and to understand
                which parts of our websites, products, and Internet services are of most interest to them,
                and diagnose problems with our servers and websites;
              </li>
              <li>
                When you visit the Faithmo mobile application, we may ask you to opt in to allow us to use
                GPS technology (or other similar technology) to determine your current location for purposes
                of reporting on user activity and engagement. If you do not want us to use your location for
                the purposes set forth above, you should not opt in or turn off the location services for
                the Faithmo mobile application located in your account settings or in your mobile phone
                settings and/or within the mobile application;
              </li>
              <li>
                We may use personal information to provide products and/or services that you have requested
                as well as for auditing, research, and analysis to improve ChurchButton’s products.
              </li>
            </ul>
            <br />
            <br />
            PUBLICLY DISPLAYED INFORMATION IS PUBLIC
            <br />
            <br />
            If you use a bulletin board, streaming service, or chat room on a ChurchButton website or
            Service you should be aware that any information you share is visible to other users. Personally
            identifiable information you submit to one of these forums can be read, collected, or used by
            other individuals to send you unsolicited messages. ChurchButton is not responsible for the
            personally identifiable information you choose to submit in these forums. For example, if you
            choose to make information, which was previously non-public, available by disclosing it in such
            forms or by enabling certain user features, ChurchButton will collect that information from your
            interaction and the information will become publicly available.
            <br />
            <br />
            WHEN WE DISCLOSE YOUR INFORMATION
            <br />
            <br />
            ChurchButton takes your privacy very seriously. ChurchButton does not sell or rent your contact
            information to other marketers or any other third party. If you wish to utilize the ChurchButton
            Account Services, ChurchButton discloses your information to third party service providers and
            institutions for purposes of processing and transmitting information to drive the correct data
            and content between servers and apps for your experience.
            <br />
            <br />
            WITHIN THE CHURCHBUTTON GROUP
            <br />
            <br />
            ChurchButton, LLC both operate under the name “ChurchButton”, “Faithmo” and they operate as a
            group. To help us provide superior service, your personal information may be shared with legal
            entities within the ChurchButton group globally who will take reasonable steps to safeguard it
            in accordance with ChurchButton’s privacy policy.
            <br />
            <br />
            WITH OUR SERVICE PROVIDERS, VENDORS, AND STRATEGIC PARTNERS
            <br />
            <br />
            There are also times when it may be advantageous for ChurchButton to make certain personal
            information about you available to companies that ChurchButton has a strategic relationship with
            or that perform work for ChurchButton to provide products and services to you on our behalf.
            These companies may help us process information, extend credit, fulfill customer orders, deliver
            products to you, manage and enhance customer data, provide customer service, assess your
            interest in our products and services, or conduct customer research or satisfaction surveys.
            These companies are also obligated to protect your personal information in strict accordance
            with ChurchButton’s policies, except if we inform you otherwise at the time of collection.
            Without such information being made available, it would be difficult for you to purchase
            products, have products delivered to you, receive customer service, provide us feedback to
            improve our products and services, or access certain services, offers, and content on the
            ChurchButton website.
            <br />
            <br /> LAWFUL REQUESTS
            <br />
            <br />
            At times we may be required by law or litigation to disclose your personal information. We may
            also disclose information about you if we reasonably determine that for national security, law
            enforcement, or other issues of public importance, disclosure is necessary.
            <br />
            <br />
            FAITHMO GIVING
            <br />
            <br />
            Faithmo Giving is web-enabled functionality that can be used with a web browser and on mobile
            devices. It was developed by ChurchButton to enable donors to donate money to third-party
            organizations. If you choose to use the Faithmo Giving functionality to donate money,
            ChurchButton and the payment processor will collect personal information from you, including
            your name, contact information, the donation amounts, and the payment processor receives certain
            payment information (e.g. credit card number, billing address, security code) and will use that
            information to process payments and provide you records of the transactions. Donor information
            will be shared with the Gift Recipient. When you send a text message to ChurchButton or Faithmo
            for purposes of utilizing text-to-give functionality, you will be disclosing your cell phone
            number to ChurchButton, LLC, and you thereby consent to receiving a hyperlink to the Faithmo
            donation portal via text message. In order to stop receiving texts from ChurchButton or Faithmo,
            respond to the text message by typing, “STOP.”
            <br />
            <br />
            <br />
            <br />
            COOKIES AND OTHER TECHNOLOGIES
            <br />
            <br />
            As is standard practice on many corporate websites, ChurchButton’s websites use “cookies” and
            other technologies to help us understand which parts of our websites are the most popular, where
            our visitors are going, and how much time they spend there. We also use cookies and other
            technologies to make sure that our online advertising is bringing customers to our products and
            services. Cookies contain information that is transferred to your computer’s hard drive. These
            cookies are used to store information, such as the time that the current visit occurred, whether
            the visitor has been to the site before and what site referred the visitor to the web page.
            <br />
            <br />
            If, however, you prefer not to enable cookies, you can disable them in your browser. Please note
            that certain features of the ChurchButton websites and ChurchButton online products will not be
            available once cookies are disabled. As is true of most websites, we gather certain information
            automatically and store it in log files. This information includes Internet Protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), referring/exit pages, operating
            system, date/time stamp, and clickstream data.
            <br />
            <br />
            We also use Google Analytics. Google Analytics is a web analytics tool that helps website owners
            understand how visitors engage with their website. Like many services, Google Analytics uses
            first-party cookies to track visitor interactions as in our case, where they are used to collect
            information about how visitors use our site. We then use the information to compile reports and
            to help us improve our site.
            <br />
            <br />
            We also may use other Google Analytics tools, such as Demographics and Interest Reporting, which
            enable us to learn more about the characteristics and interests of the users who visit our Site,
            and Remarketing with Google Analytics, which enables us to provide relevant advertising on
            different websites and online services.
            <br />
            <br />
            Google Analytics collects information anonymously. It reports website trends without identifying
            individual visitors. You can opt out of Google analytics without affecting how you visit our
            site – for more information on opting out of being tracked by Google Analytics across websites
            you use, visit this Google page.
            <br />
            <br />
            We use this information, to analyze trends, to administer the site, to track users’ movements
            around the site and to gather demographic information about our user base as a whole.
            <br />
            <br />
            In some of our email messages we use a “click-through URL” linked to content on the ChurchButton
            website. When customers click one of these URLs, they pass through our web server before
            arriving at the destination web page. We track this click-through data to help us determine
            interest in particular topics and measure the effectiveness of our customer communications. If
            you prefer not to be tracked simply avoid clicking text or graphic links in the email. In
            addition, we use pixel tags — tiny graphic images — to tell us what parts of our website
            customers have visited or to measure the effectiveness of searches customers perform on our
            site.
            <br />
            <br />
            Pixel tags also enable us to send email messages in a format customers can read. And they tell
            us whether emails have been opened to ensure that we’re sending only messages that are of
            interest to our customers. We may use this information to reduce or eliminate messages sent to a
            customer.
            <br />
            <br />
            HOW WE PROTECT YOUR PERSONAL INFORMATION
            <br />
            <br />
            ChurchButton takes precautions — including administrative, technical, and physical measures — to
            safeguard your personal information against loss, theft, and misuse, as well as unauthorized
            access, disclosure, alteration, and destruction. The ChurchButton websites use Secure Sockets
            Layer (SSL) encryption on all web pages where personal information is required. To make
            purchases from the ChurchButton online store, or through your ChurchButton accounts, you must
            use an SSL-enabled browser such as Safari, Google, or Internet Explorer. Doing so protects the
            confidentiality of your personal and credit card information while it’s transmitted over the
            Internet. You can help us by also taking precautions to protect your personal data when you are
            on the Internet. Change your passwords often using a combination of letters and numbers, and
            make sure you use a secure web browser like Safari or Google.
            <br />
            <br />
            INTEGRITY OF YOUR PERSONAL INFORMATION
            <br />
            <br />
            ChurchButton allows you to keep your personal information accurate, complete, and up to date.
            Naturally, you have the right to access, correct and delete the personal information you have
            provided, though you may not delete all information if you wish to maintain an account with
            ChurchButton and ChurchButton is required to retain some information with regard to Faithmo
            Giving transactions and donors. Despite our best efforts, errors sometimes do occur. If you
            identify any personal information that is out-of-date, incorrect or incomplete, let us know and
            we will make the corrections promptly and use every reasonable effort to communicate these
            changes to other parties who may have inadvertently received incorrect or out-of-date personal
            information from us. In the event that you delete your information, such deletion may make it
            impossible for ChurchButton to continue offering you some or all of the ChurchButton Account
            Services. ChurchButton retains personal information only as long as we are required to for our
            business relationship or as required by Federal or Provincial laws, subject to reasonable
            industry practices for records retention. ChurchButton has appropriate procedures in place with
            respect to the destruction, deletion and disposition of personal information when it is no
            longer required by ChurchButton, subject to applicable law.
            <br />
            <br />
            CHILDREN
            <br />
            <br />
            ChurchButton recognizes that parents, guardians, or other adults often purchase our products for
            family use, including use by minors. We do not knowingly collect personal information from
            children under the age of 13 for marketing purposes, but because some information is collected
            electronically, it can appear to be the personal information of the ChurchButton purchaser of
            the product, and will be treated as such by this privacy policy. If a child under the age of 13
            submits personal information to ChurchButton and we learn that that personal information is the
            information of a child under the age of 13, we will attempt to delete the information as soon as
            possible.
            <br />
            <br />
            CANADA CUSTOMERS
            <br />
            <br />
            Our policies and practices have been designed to comply with the Personal Information Protection
            and Electronic Documents Act (Canada), the Privacy Act (Canada) and all provincial statutes that
            regulate the treatment of personal information in the private and public sectors. Depending on
            the location of users of the ChurchButton Account Services, information on in the ChurchButton
            Account Services including the ChurchButton website may be accessed from outside of Canada or
            sent to others outside of Canada. Please note that any personal information that is sent outside
            of Canada may be subject to access by law enforcement and government authorities having
            jurisdiction in those countries in which the information is located.
            <br />
            <br />
            If the event that any dispute between you and ChurchButton regarding your personal information
            or this policy is not resolved pursuant to the “Dispute Resolution” section below within thirty
            (30) days, either party may consult the Privacy Commissioner of Canada or a relevant provincial
            privacy commissioner.
            <br />
            <br />
            PRIVACY NOTICE FOR EU RESIDENTS
            <br />
            <br />
            This Section [•] governs personal data, information relating to an identified or identifiable
            natural person, gathered from data subjects located in the EU only.
            <br />
            <br />
            General Data Protection Regulation (“GDPR”) Information
            <br />
            <br />
            The following information describes our commitments to you under EU General Data Protection
            Regulation (“GDPR”).
            <br />
            <br />
            The GDPR makes a distinction between organizations that process personal data for their own
            purposes (known as "Data Controllers") and organizations that process personal data on behalf of
            other organizations (known as "Data Processors"). ChurchButton only acts as a Data Controller
            for very limited types of data, such as the information you enter when you register an account
            with us or the information you submit when purchasing our software. ChurchButton is the Data
            Controller for information provided by our users when we provide our Services. ChurchButton is
            the Data Processor for information provided by our third party partners when they provide us
            with services, such as our payment partners processing payments on behalf of our users.
            <br />
            <br />
            When We Act as a Data Controller
            <br />
            <br />
            When we process your data as a Data Controller, the following applies.
            <br />
            <br />
            We collect, use, and share your personal data where we are satisfied that we have an appropriate
            legal basis to do this. This may be because:
            <br />
            <ul>
              <li>
                consent: our use of your personal data is in accordance with your consent. if we process
                your personal data based on consent, you will be asked for said consent at or before the
                time of data collection. you may withdraw your consent at any time, and will not suffer any
                detriment for withdrawing your consent.
              </li>
              <li>Contract: Our use of your personal data is to fulfill a contract between you and us.</li>
              <li>
                Legal Obligation: Our use of your personal data is necessary to comply with a relevant legal
                or regulatory obligation that we have (for example, where we are required to disclose
                personal data to a court, or store information due to federal financial regulations); or
              </li>
              <li>
                Legitimate Interest: Our use of your personal data is for a legitimate interest of ours,
                such as fraud prevention and ensuring our network’s security.
              </li>
            </ul>
            Subject to certain exemptions, and in some cases dependent upon the processing activity we are
            undertaking, EU residents have certain rights in relation to their personal data:
            <br />
            <br />
            <div className="privacy-p">
              • Right to Access. You have the right to access your personal data that is being processed;
              specifically you may request to view your personal data and obtain copies of your personal
              data. <br />
              <br />• Right to Rectification. You have the right to request modifications to your personal
              data if it is out of date or inaccurate. In some circumstances, you may be able to exercise
              this right, in whole or in part, through your existing account with us. <br />
              <br />• Right of Erasure. You have the right to ask that we delete your personal data.
              However, we are not required to comply with your request to erase personal data if the
              processing of your personal data is necessary for compliance with a legal obligation, or for
              the establishment, exercise, or defense of legal claims. <br />
              <br />• Right to Restriction of Processing. Under certain circumstances, you have the right to
              request we restrict processing your personal data You have the right to restrict the use of
              your personal data. However, we can continue to use your personal data following a request for
              restriction (a) where we have your consent; (b) to establish, exercise or defend legal claims;
              or (c) to protect the rights of another natural or legal person. <br />
              <br />• Right to Data Portability: To the extent that we process your information (i) based on
              your consent or under a contract; and (ii) through automated means, you have the right to
              receive such personal data in a structured, commonly used, machine-readable format, or you can
              ask to have it transferred directly to another data controller. <br />
              <br />• Right to Object: You have the right to object to the processing of your personal data.
              However, we may still process your personal data if we demonstrate compelling legitimate
              grounds for the processing which override the interests, rights and freedoms of the data
              subject or for the establishment, exercise or defense of legal claims. <br />
              <br />• Right to Object to Automated Processing. You have the right to object to decisions
              based on automated processing, such as where a computer assesses factors in the data we
              collect about you and makes a determination. We do not currently make any decisions based on
              automated processing. We retain your personal data for as long as necessary to provide you
              with our services, or for other important purposes such as complying with legal obligations,
              resolving disputes, and enforcing our agreements.
            </div>
            <br />
            <br />
            We ask that you please attempt to resolve any issues regarding your data protection or requests
            with us first before contacting the relevant supervisory authority. If you would like to
            exercise any of the rights described above, please send a request to info@faithmo.com. In your
            message, please indicate the right you would like to exercise and the information that you would
            like to access, review, correct, or delete.
            <br />
            <br />
            We may ask you for additional information to confirm your identity and for security purposes,
            before disclosing the requested personal data.
            <br />
            <br />
            We may not always be able to fully address your request, for example if it would impact the duty
            of confidentiality we owe to others, or if we are legally entitled to deal with the request in a
            different way.
            <br />
            <br />
            When ChurchButton Acts as a Data Processor
            <br />
            <br />
            Where we process your data in our capacity as a Data Processor, the processing of your data will
            not be governed by the foregoing provisions (“When We Act As Data Controller”), but you can
            contact the Data Controller directly to learn about their processing of your information and to
            exercise your rights, or we will forward your request directly to them at your request.
            <br />
            <br />
            ChurchButton’s “privacy by design” approach requires that our default user data protection
            levels be at the highest setting by default. In the unlikely event of breach, ChurchButton will
            notify data subjects and Supervisory Authorities (SAs) in the EU according to procedures
            provided in GDPR Articles 33 and 34.
            <br />
            <br /> EU-US PRIVACY SHIELD FRAMEWORK
            <br />
            <br />
            The following provisions govern information collected in reliance on the EU-U.S. Privacy Shield
            Framework Principles for transfers of personal data from the EU to the United States.
            ChurchButton adheres to the Privacy Shield Principles (“Principles”) and is committed to subject
            to the Principles all personal data received from the EU in reliance on the Privacy Shield.
            Individuals from whom ChurchButton collects personal information under the Privacy Shield have
            the right to access their personal data by contacting ChurchButton at info@faithmo.com. As a
            result of certification to the Privacy Shield, ChurchButton is subject to the investigatory and
            enforcement powers of the Federal Trade Commission or any other U.S. authorized statutory body.
            <br />
            <br />
            <br />
            <br />
            Notice and Choice
            <br />
            <br />
            When ChurchButton collects personal information from individuals, it may share this information
            with its client organizations or third parties as described above in the Privacy Policy.
            Individuals should review the privacy policy of the client organization. Individuals will have
            the choice of signing up for ChurchButton services or not. A link to the ChurchButton privacy
            policy will be provided when individuals are first asked to provide personal information when
            opting in to ChurchButton services. In instances in which ChurchButton is not the controller or
            collector of the personal information, but only a processor, it has no means of providing
            individuals with the choice and means for limiting the use and disclosure of their personal
            information or providing notices when individuals are first asked to provide personal
            information to ChurchButton. In such instances, ChurchButton will comply with the instructions
            of the controller of such information; provide appropriate technical and organizational measures
            to protect personal data against accidental or unlawful destruction or accidental loss,
            alteration, unauthorized disclosure or access, and to the extent appropriate, assist the
            controller in responding to individuals exercising their rights under the Principles.
            <br />
            <br />
            In the context of an onward transfer ChurchButton has responsibility for the processing of
            personal information it receives under the Privacy Shield and subsequently transfers to a third
            party acting as an agent on its behalf. ChurchButton shall remain liable under the Principles if
            its agent processes such personal information in a manner inconsistent with the Principles,
            unless the organization proves that it is not responsible for the event giving rise to the
            damage.
            <br />
            <br />
            Disclosures to Third Parties
            <br />
            <br />
            ChurchButton will not make disclosures of personal information to third parties without
            notifying individuals that such disclosure may be made. In those instances in which ChurchButton
            collects personal information from individuals, prior to disclosing personal information to a
            third party, ChurchButton shall notify the individual of the fact that their information may be
            disclosed. If individuals do not wish to have their personal information disclosed to any third
            parties, the individual should not register for such ChurchButton services. With regard to
            Faithmo Giving, donor information will be shared with the Gift Recipient. The Gift Recipient may
            utilize a third party for purposes of receipt and management of such information and donors
            should review the privacy policies of Gift Recipient in this regard. In the case of third
            parties (e.g., churches) for whom ChurchButton gathers personal information, ChurchButton shall
            enter into a contract that provides that such data may only be processed for limited and
            specified purposes consistent with consent provided and that such third party will provide the
            same level of protection as is required by the Principles. For third party agent recipients
            (e.g., payment processors) of personal information, ChurchButton shall: transfer only such data
            for limited and specified purposes; ascertain that the agent is obligated to provide at least
            the same level of privacy protection as is required by the Principles, and; upon notice, take
            reasonable and appropriate steps to stop and remediate unauthorized processing.
            <br />
            <br />
            Data Security
            <br />
            <br />
            ChurchButton shall take reasonable steps to protect personal information from loss, misuse and
            unauthorized access, disclosure, alteration and destruction. ChurchButton has put in place
            appropriate physical, electronic and managerial procedures to safeguard and secure the
            information from loss, misuse, unauthorized access or disclosure, alteration or destruction.
            ChurchButton cannot guarantee the security of information on or transmitted via the Internet.
            <br />
            <br />
            Data Integrity
            <br />
            <br />
            ChurchButton shall only process personal information in a way that is compatible with and
            relevant for the purpose for which it was collected or authorized by those who provided the
            information. To the extent necessary for those purposes, ChurchButton shall take reasonable
            steps to ensure that personal information is accurate, complete, current and reliable for its
            intended use.
            <br />
            <br />
            Access
            <br />
            <br />
            In those instances in which ChurchButton collects personal information directly from
            individuals, ChurchButton shall allow those individuals access to their personal information and
            allow the individual to correct, amend or delete inaccurate information, except where the burden
            or expense of providing access would be disproportionate to the risks to the privacy of the
            individual in the case in question or where the rights of persons other than the individual
            would be violated. As noted above, you may not delete all information if you wish to maintain an
            account with ChurchButton and ChurchButton is required to retain some information with regard to
            Faithmo Giving transactions and the applicable users.
            <br />
            <br />
            Recourse, Enforcement, and Liability
            <br />
            <br />
            <div className="privacy-p">
              A) Dispute Resolution
              <br />
              <br />
              If you filed a complaint with ChurchButton and it has not been properly addressed, JAMS is
              designated by ChurchButton as the independent dispute resolution body to address complaints
              regarding ChurchButton’s collection of personal information and provide appropriate recourse.
              Such body will not charge the complaining party for its services. Follow this link to the
              complaint submission form for the above referenced independent dispute resolution body.
              <br />
              <br />
              B) Binding Arbitration
              <br />
              <br />
              If your claims as to data covered by the EU-U.S. Privacy Shield have not been remedied through
              dispute resolution directly with ChurchButton or through independent dispute resolution as
              described above, such “residual claims” may be heard by a “Privacy Shield Panel” composed of
              one or three arbitrators as agreed upon by the parties. The Privacy Shield Panel may only
              award individual-specific, non-monetary equitable relief (e.g. access, correction, deletion of
              the individual’s data in question) necessary to remedy the violation of the Principles only
              with respect to the individual. Damages, costs, fees and other remedies may not be awarded,
              and each party bears its own attorney’s fees. This arbitration option is only available for an
              individual to determine for such “residual claims” whether ChurchButton has violated its
              obligations under the Principles as to that individual and whether any such violation remains
              fully or partially unremedied.
              <br />
              <br />
              C) GDPR (General Data Protection Regulation)
              <br />
              <br />
              The GDPR replaces Directive 95/46/EC and becomes enforceable on May 25, 2018. The following
              statement is intended to supplement the preceding discussion of the EU-U.S. Privacy Shield. As
              to personal data collected and controlled by ChurchButton, subject to the qualifications and
              limitations stated in the preceding discussion, EU data subjects retain their full rights to
              be informed of the purposes of our processing activities at collection; to withdraw consent;
              to access, rectify, transport, and erase their personal data; to object to processing for
              direct marketing efforts; and to object when subjected to automated processing decisions. As
              to personal data collected by third parties, and as to which ChurchButton is a mere processor,
              EU data subjects should contact the controller (e.g., church or ministry) with regard to their
              rights to be informed of the purposes of our processing activities at collection; to withdraw
              consent; to access, rectify, transport, and erase their personal data; to object to processing
              for direct marketing efforts; and to object when subjected to automated processing decisions.
              Such rights may be subject to certain qualifications and limitations as stated in the
              discussion of EU-US Privacy Shield.
            </div>
            <br />
            <br />
            Our Data Processing Officers will assist EU residents with these requests free of charge and may
            be contacted at info@faithmo.com.
            <br />
            <br />
            ChurchButton understands that the adoption of global data security practices is not a one-time
            activity. ChurchButton’s “privacy by design” approach requires that our default user data
            protection levels be at the highest setting by default. In the unlikely event of breach,
            ChurchButton will notify data subjects and Supervisory Authorities (SAs) in the EU according to
            procedures provided in GDPR Articles 33 and 34.
            <br />
            <br />
            We do not intentionally collect personal data from, and do not tailor any services to, children.
            <br />
            <br />
            DATA PRIVACY FOR CALIFORNIA RESIDENTS
            <br />
            <br />
            This section applies solely to visitors and users of our Site and Services who reside in the
            State of California. We have adopted this notice to comply with the California Consumer Privacy
            Act of 2018 (the “CCPA”) and the California Online Privacy Protection Act (“CalOPPA”), and any
            terms defined in the CCPA or CalOPPA have the same meaning when used in this notice.
            <br />
            <br />
            For the purposes of this section “California Data Subject” shall mean: (1) an individual who is
            in the State of California for other than a temporary or transitory purpose, and (2) an
            individual who is domiciled in the State of California who is outside the State of California
            for a temporary or transitory purpose.
            <br />
            <br />
            <br />
            <br />
            Information We Collect
            <br />
            <br />
            ChurchButton collects information that identifies, relates to, describes, references, is capable
            of being associated with, or could reasonably be linked, directly or indirectly, with a
            particular California Data Subject or device ("personal information"). Third Parties
            <br />
            <br />
            We are provided information by our third party vendors such as:
            <ul>
              <li>
                Authentication Partners (who may provide us with personal information regarding users who
                authenticate with our Services through a third party)
              </li>
              <li>
                Technology Service Providers (who may provide us personal information in the form of usage
                information, IP addresses, etc. of users of our Site and Services)
              </li>
              <li>
                Payment Partners (who may provide us personal information in order to process payments from
                users)
              </li>
              <li>
                Advertising Partners (Who may provide information about users viewing our advertisements)
              </li>
            </ul>
            Use of Personal Information
            <br />
            <br />
            We may use or disclose the personal information we collect for one or more of the following
            business purposes:
            <br />
            <br />
            <div className="privacy-p">
              A) To fulfill the purpose for which you provided the information. For example, if you share
              your name and contact information to request a price quote or ask a question about our
              products or services, we will use that personal information to respond to your inquiry. If you
              create an account on our Services the personal information you provide as part of the account
              creation process may be visible to other account holders, and we may use that information to
              verify your identity when you access the account. We may use personal information you provide
              us to provide technical support. In addition, we may use the above information:
              <br />
              <br />
              <div className="privacy-p">
                a) To provide, support, personalize, and develop our websites, products, and/or services;{' '}
                <br />
                <br />
                b) To create, maintain, customize, and secure your account with us; <br />
                <br />
                c) To process your requests, purchases, transactions, and payments and prevent transactional
                fraud;
                <br />
                <br /> d) To provide you with support and to respond to your inquiries, including to
                investigate and address your concerns and monitor and improve our responses; <br />
                <br />
                e) To help maintain the safety, security, and integrity of our Website, products and
                services, databases and other technology assets, and business; <br />
                <br />
                f) To respond to law enforcement requests and as required by applicable law, court order, or
                governmental regulations; and <br />
                <br />
                g) As described to you when collecting your personal information or as otherwise set forth
                in the CCPA.
              </div>
            </div>
            <br />
            <br />
            ChurchButton will not collect additional categories of personal information or use the personal
            information we collected for materially different, unrelated, or incompatible purposes without
            providing you notice.
            <br />
            <br />
            ChurchButton does not sell your personal information. ChurchButton does share personal
            information with our third party service providers and vendors in order to provide you the
            Service.
            <br />
            <br />
            Your Rights and Choices
            <br />
            <br />
            This section describes your CCPA rights and explains how to exercise those rights.
            <br />
            <br />
            You have the right to request that we disclose certain information to you about our collection
            and use of your personal information over the past 12 months. Once we receive and verify your
            request, we will disclose to you:
            <br />
            <br />
            A) The categories of personal information we collected about you; <br />
            <br />
            B) The categories of sources for the personal information we collected about you;
            <br />
            <br /> C) Our business or commercial purpose for collecting or selling that personal
            information; <br />
            <br />
            D) The categories of third parties with whom we share that personal information; <br />
            <br />
            E) The specific pieces of personal information we collected about you (also called a data
            portability request);
            <br />
            <br /> F) If we sold or disclosed your personal information for a business purpose, two separate
            lists disclosing:
            <br />
            <br />{' '}
            <div className="privacy-p">
              a) sales, identifying the personal information categories that each category of recipient
              purchased; and
              <br />
              <br /> b)disclosures for a business purpose, identifying the personal information categories
              that each category of recipient obtained.
            </div>
            <br />
            <br />
            You have the right to request that we delete any of your personal information that we collected
            from you and retained, subject to certain exceptions. Once we receive and verify your request,
            we will delete (and direct our service providers to delete) your personal information from our
            records, unless an exception applies.
            <br />
            <br />
            We may deny your deletion request if retaining the information is necessary for us or our
            service providers to:
            <br />
            <br />
            <div className="privacy-p">
              A) Complete the transaction for which we collected the personal information, provide a good or
              service that you requested, take actions reasonably anticipated within the context of our
              ongoing business relationship with you, or otherwise perform our contract with you;
              <br />
              <br /> B) Detect security incidents, protect against malicious, deceptive, fraudulent, or
              illegal activity, or prosecute those responsible for such activities;
              <br />
              <br /> C) Debug products to identify and repair errors that impair existing intended
              functionality;
              <br />
              <br /> D) Exercise free speech, ensure the right of another California Data Subject to
              exercise their free speech rights, or exercise another right provided for by law;
              <br />
              <br /> E) Comply with the California Electronic Communications Privacy Act (Cal. Penal Code §
              1546 seq.);
              <br />
              <br /> F) Engage in public or peer-reviewed scientific, historical, or statistical research in
              the public interest that adheres to all other applicable ethics and privacy laws, when the
              information's deletion may likely render impossible or seriously impair the research's
              achievement, if you previously provided informed consent;
              <br />
              <br /> G) Enable solely internal uses that are reasonably aligned with California Data Subject
              expectations based on your relationship with us;
              <br />
              <br /> H) Comply with a legal obligation; and <br />
              <br />
              I) Make other internal and lawful uses of that information that are compatible with the
              context in which you provided it.
            </div>
            <br />
            <br />
            To exercise the access, data portability, and deletion rights described above, please submit a
            verifiable California Data Subject request to us by sending us an email at info@faithmo.com.
            <br />
            <br />
            Only you or a person registered with the California Secretary of State, that you authorize to
            act on your behalf, may make a verifiable California Data Subject request related to your
            personal information. You may also make a verifiable California Data Subject request on behalf
            of your minor child.
            <br />
            <br />
            You may only make a verifiable California Data Subject request for access or data portability
            twice within a twelve (12) month period. The verifiable California Data Subject request must:
            <br />
            <br />
            <div className="privacy-p">
              A) Provide sufficient information that allows us to reasonably verify you are the person about
              whom we collected personal information or an authorized representative; and
              <br />
              <br /> B) Describe your request with sufficient detail that allows us to properly understand,
              evaluate, and respond to it.
            </div>
            <br />
            <br />
            We cannot respond to your request or provide you with personal information if we cannot verify
            your identity or authority to make the request and confirm the personal information relates to
            you. Making a verifiable California Data Subject request does not require you to create an
            account with us. We will only use personal information provided in a verifiable California Data
            Subject request to verify the requestor's identity or authority to make the request.
            <br />
            <br />
            We aspire to respond to a verifiable California Data Subject request within forty five (45) days
            of receipt of the request. If we require more time (up to ninety (90) days) we will inform you
            of the reason(s) why an extension is needed and how long we anticipate the period to be. Any
            disclosure we provide will only cover the twelve (12) month period preceding the receipt of your
            request. If applicable, the response may provide the reasons why we cannot comply with your
            request. For data portability requests, we will select a format to provide your personal
            information that is readily useable and should allow you to transmit the information from one
            entity to another entity without hindrance.
            <br />
            <br />
            We do not charge a fee to process or respond to your verifiable California Data Subject request
            unless it is excessive, repetitive, or manifestly unfounded. If we determine that the request
            warrants a fee, we will tell you why we made that decision and provide you with a cost estimate
            before completing your request. We reserve the right to refuse to respond to verifiable
            California Data Subject requests that are excessive, repetitive, or manifestly unfounded.
            <br />
            <br />
            Right of Non-Discrimination
            <br />
            <br />
            We will not discriminate against you for exercising any of your CCPA rights. We will not take
            any of the following actions against you in response to an exercise of your rights:
            <br />
            <br />
            <div className="privacy-p">
              A) Deny you goods or services.
              <br />
              <br /> B) Charge you different prices or rates for goods or services, including through
              granting discounts or other benefits, or imposing penalties.
              <br />
              <br /> C) Provide you a different level or quality of goods or services.
              <br />
              <br /> D) Suggest that you may receive a different price or rate for goods or services or a
              different level or quality of goods or services.
            </div>
            <br />
            <br />
            California Do-Not-Track Disclosures
            <br />
            <br />
            ChurchButton does not track its customers over time and across third party websites to provide
            targeted advertising and therefore does not respond to Do Not Track (DNT) signals. Third parties
            that have content embedded on ChurchButton’s websites, software, or mobile applications (e.g.
            social features) may set cookies on a user’s browser and/or obtain information about the fact
            that a web browser visited a specific ChurchButton website from a certain IP address. Third
            parties cannot collect any other personal identifiable information from ChurchButton’s websites
            unless you provide it to them directly.
            <br />
            <br />
            OUR COMPANY-WIDE COMMITMENT TO YOUR PRIVACY
            <br />
            <br />
            To make sure your personal information is secure, we communicate these privacy guidelines to
            ChurchButton employees and strictly enforce privacy safeguards within the company.
            <br />
            <br />
            FREEDOM OF INFORMATION REQUESTS
            <br />
            <br />
            If you are communicating with or making a donation to any organization or institution that is
            subject to either federal or provincial public sector “freedom of information” or “access to
            information” legislation, then please note that information concerning your communication and/or
            donation may disclosed to third parties pursuant to the procedures available under those laws.
            <br />
            <br />
            INQUIRES, COMPLAINTS, AND DISPUTE RESOLUTION
            <br />
            <br />
            If you wish to verify, correct or delete any personal information we have collected, or if you
            have any questions or concerns, or if you have any complaints, please contact info@faithmo.com.
            If there is a dispute between you and ChurchButton regarding your personal information or this
            policy, you agree to use reasonable efforts to resolve such dispute with ChurchButton informally
            and to consult and negotiate with ChurchButton in good faith to reach a fair and equitable
            solution.
          </article>
        );
      case 'terms':
        return (
          <article>
            <h5 style={{ textAlign: 'center' }}>TERMS OF USE</h5>
            <div>
              <br />
              <br />
              PLEASE READ THESE TERMS OF SERVICE CAREFULLY. BY USING THE SERVICE (AS DEFINED BELOW), YOU
              AGREE TO BE BOUND BY THE TERMS AND CONDITIONS DESCRIBED HEREIN (“TERMS OF SERVICE” OR THE
              “AGREEMENT”). IF YOU ARE ENTERING THIS AGREEMENT ON BEHALF OF AN ORGANIZATION, YOU CONFIRM
              THAT YOU HAVE THE AUTHORITY TO BIND THE ORGANIZATION AND THAT THE ORGANIZATION WILL BE BOUND
              BY THESE TERMS. THE TERM “YOU” OR “YOUR” SHALL REFER TO YOU AND SUCH ORGANIZATION (IF ANY).
              <br />
              <br />
              1. OWNERSHIP
              <br />
              <br />
              This Service is owned and operated by ChurchButton, LLC. (hereinafter “ChurchButton”, “we” or
              “us).
              <br />
              <br />
              2. THE SERVICE
              <br />
              <br />
              These Terms of Service describe the terms and conditions related to your use of the following
              (collectively referred to herein as the “Service”): (a) media applications published by
              ChurchButton (each a “Faithmo” mobile application), ChurchButton’s application program
              interface (“ChurchButton API”), and any documentation related thereto, all provided to you and
              for you by ChurchButton; (b) the configuration tools, configuration services, and Faithmo
              mobile applicationpublication and maintenance services provided to you by ChurchButton; (c)
              the websites provided by ChurchButton, (d) the integrated giving platform service and
              functionality provided to you by Faithmo. Section 6 of these Terms of Service applies only to
              Faithmo Giving. End users of the Site or any ChurchButton productmust also agree to
              ChurchButton’s Terms of Use.
              <br />
              <br />
              3. PRIVACY POLICY AND TERMS OF USE
              <br />
              <br />
              Please refer to our Privacy Policy for information on how ChurchButton collects, uses and
              discloses personally identifiable information from its users. These Terms of Service
              incorporate by reference the ChurchButton Terms of Use.
              <br />
              <br />
              4. TERM AND TERMINATION
              <br />
              <br />
              Unless you have agreed to a longer term in a separate written agreement, the initial term of
              this agreement is one year. Thereafter, this agreement will renew automatically from year to
              year unless you notify ChurchButton of your intention to terminate at least thirty (30) days
              prior to the end of the then-current contract term, in which case your agreement shall
              terminate on the last day of then-current contract period.
              <br />
              <br />
              ChurchButton may terminate this Agreement without cause upon written notice to you. If
              ChurchButton terminates in such a manner, it shall refund you a portion of the subscription
              fees you paid prior to such termination, pro-rated based on the subscription services already
              provided. In the event this Agreement is terminated, upon your request, ChurchButton will make
              available to you a file of your Customer Materials for download for a period of thirty (30)
              days after termination. You agree and acknowledge that ChurchButton has no obligation to
              retain your Customer Materials or other data, and may delete same, thirty (30) days after
              termination. Closing your account shall not relieve you of the obligations and/or restrictions
              stated herein.
              <br />
              <br /> This Section supersedes Section 19 of the Terms of Use.
              <br />
              <br />
              5. ACCOUNT
              <br />
              <br />
              You may open an account by completing the information on the registration pages of the Faithmo
              website. You are responsible for maintaining the confidentiality of your user name and
              password. Your username and/or password may not be assigned or transferred to any other person
              or entity. You are required to provide your email address in order to open an account. Your
              email address will help us to verify your identity on future visits. In the event that you
              register using a non-existent email address or an email address that belongs to someone else,
              we may terminate your account without notice. You will be responsible for any damage caused by
              unauthorized access resulting from your failure to keep your password secure.
              <br />
              <br />
              6. FAITHMO GIVING
              <br />
              <br />
              <div className="privacy-p">
                6.1 To use Faithmo Giving, you must register for that service and provide your bank or other
                financial institution account information. By registering for Faithmo Giving, you:
                <br />
                <br />
                <div className="privacy-p">
                  a. authorize Faithmo to act as your agent to collect donations in your name and donor
                  information on your behalf;
                  <br />
                  <br />
                  b. represent and warrant that all account information that you provide to Faithmo shall be
                  true and correct;
                  <br />
                  <br />
                  c. represent and warrant to Faithmo that at all times during the term of this Agreement,
                  (i) for United States entities, you are and will remain recognized by the Internal Revenue
                  Service as exempt from federal income tax under IRC Section 501(c)(3), and have public
                  charity status under IRC Section 509, and will utilize all donations received through
                  Faithmo in accordance with such tax-exempt status, and your organization shall not violate
                  any restrictions imposed by applicable law on IRC Section 501(c)(3) entities, including
                  but not limited to those proscribing political activity or proscribing the use of your
                  income or assets for a private purpose, or, for Canadian entities, you are and will
                  remain, registered as a charity under the Income Tax Act of Canada with the Canada Revenue
                  Agency (“CRA”); (ii) you understand you may have obligations to register under, and
                  covenant that you shall fully comply and bear the costs associated with, any and all
                  applicable federal, state, provincial and local statutes governing the solicitation of
                  charitable solicitations and donations, including but not limited to fulfilling any
                  registration requirements thereof; (iii) you have completed and submitted the Electronic
                  Funds Transfer Authorization Agreement (via "Stripe"), (iv) you will promptly notify
                  ChurchButtonof any change in your tax-exempt status, and any inquiry by the IRS, CRA or
                  any other federal, state, provincial or local government regarding the matters described
                  in (i) and (ii) above; (v) the donor of any online donation will not receive, nor be
                  promised to receive, any valuable goods or services as a result of such donation; (vi) you
                  agree to indemnify and hold harmless ChurchButton and Faithmo from and against any loss or
                  liability of any kind, including but not limited to fees and costs incurred in defense
                  thereof, resulting from or arising in any manner from, the material breach or inaccuracy
                  of any covenant, duty, representation or warranty set forth herein. Your obligation to
                  indemnify ChurchButton and Faithmo shall survive termination of this Agreement. <br />
                  <br /> d. agree to provide ChurchButtonwith proof of tax-exempt status and with
                  information for an acknowledgement letter and receipt that will be emailed to the donor
                  automatically and will allow the donor to seek and have evidence for tax deduction
                  purposes. <br />
                  <br /> e. (Unless you choose Monthly Billing) agree that ChurchButton may deduct its
                  service fees from the donation amounts. <br />
                  <br /> f. authorize ChurchButton and/or third parties associated with the processing of
                  payments to debit your depository account in order to collect fees as well as for the
                  purposes of funding refund requests by the donor and/or chargebacks imposed by the
                  applicable credit card company used by the donor. <br />
                  <br /> g. agree that payment to the designated organization will be made approximately a
                  week after receipt of funds from donor and will be sent to the designated organization via
                  electronic funds transfer.
                  <br />
                  <br />
                  h. warrant and represent that your representatives have legal and financial authority to
                  make legally binding financial decisions on behalf of your organization;
                  <br />
                  <br />
                  i. authorize us to provide your business name and limited information to financial
                  services providers.
                </div>
                <br />
                <br />
                6.2 Account applications with ChurchButtonmay be declined based on the
                background/creditworthiness of the applicant.
                <br />
                <br /> 6.3 Donors who register for recurring gifts consent to be billed on a recurring basis
                in compliance with applicable legal requirements and card network payment rules (e.g. rules
                governing use of card networks such as Visa, MasterCard, Discover or American Express).
                <br />
                <br /> 6.4 In the event of a default under this Agreement or a misuse of applicable funds,
                ChurchButtonand financial service providers facilitating card transactions on your behalf
                may also report your business name and the name of your principals to the MATCHTM listing
                maintained by MasterCard and accessed and updated by Visa and American Express or to the
                Consortium Merchant Negative File maintained by Discover, if applicable, pursuant to
                requirements of the card network rules. You specifically consent to the fulfillment of the
                obligations related to this listing by ChurchButton and our payment processor and to the
                listing itself and you waive and hold harmless ChurchButton and Faithmo from all claims and
                liabilities resulting from such reporting.
                <br />
                <br /> 6.5 You may not utilize Faithmo Giving to process cash advances. <br />
                <br />
                6.6 You may not act as a payment intermediary or aggregator or otherwise resell our
                services.
                <br />
                <br /> 6.7 Faithmo Giving utilizes Stripe. By registering for Faithmo, you agree to be bound
                by the Stripe Connected Account Agreement (https://stripe.com/us/connect-account/legal), the
                Stripe Services Agreement (https://stripe.com/us/legal), and the Wells Fargo Services
                Addendum (https://stripe.com/wells-fargo/legal).
                <br />
                <br /> 6.8 You agree that, from the time you begin processing payment with Stripe until you
                terminate your account with us, we may identify you as a customer of Stripe. Neither you nor
                we will imply any untrue sponsorship, endorsement or affiliation between you and Stripe.
                <br />
                <br /> 6.9 Credit card companies permit donors to dispute charges that appear on their bill.
                A chargeback may result in the reversal of a transaction where you are immediately liable
                for the amount of the transaction. When a chargeback is issued, you are immediately liable
                to Faithmo and/or Stripe for the full amount of the transaction related to the chargeback
                plus any associated fees, fines, expenses or penalties. You agree that, among other
                remedies, ChurchButton Wallet and/or Stripe may recover these amounts by deducting the
                amount of the chargeback from any amounts owed to you by us. If we are unable to recover
                funds related to a chargeback for which you are liable, you will pay us the full amount of
                the chargeback immediately upon demand. Where such amounts are not immediately paid to us,
                you agree to pay all costs and expenses, including without limitation attorneys’ fees and
                other legal expenses, incurred by or on behalf of us in connection with the collection of
                any unpaid chargebacks. Chargeback reserves may be established by Faithmo or Stripe, or by
                Wells Fargo based upon risk parameters associated with your processing activity. As a
                result, donated funds could be held either in whole or in part for an indeterminate time
                period.
                <br />
                <br /> 6.10 ChurchButton is a PCI-DSS compliant service provider. ChurchButton will comply
                with all applicable PCI DSS requirements to the extent that ChurchButton possesses or
                otherwise stores, processes, or transmits cardholder data on behalf of its customers, and to
                the extent that ChurchButton could impact the security of its customers’ cardholder data
                environment.
              </div>
              <br />
              <br />
              <br />
              <br />
              7. CONFIDENTIALITY
              <br />
              <br />
              <div className="privacy-p">
                7.1 You acknowledge that your use of the Service may result in ChurchButton disclosing
                certain of its Confidential Information to you. “Confidential Information” refers to certain
                information that ChurchButton reasonably regards as proprietary or confidential relating to
                its business, customers, products, proposed products, plans, inventions, processes and
                techniques, including without limitation: (i) information, software, designs, text,
                graphics, pictures, reviews, and sound files implemented or used by ChurchButton in its
                products or to support its business operations; (ii) trade secrets, business plans,
                strategies, methods and/or practices; (iii) computer systems architecture and
                configurations; (iv) information which is governed by any now-existing or future
                non-disclosure agreement between you and ChurchButton; (v) any other information relating to
                ChurchButton that is not generally known to the public, including information about
                government investigations and actions (where disclosure is permitted) personnel, products,
                customers, financial information, marketing and pricing strategies, services or future
                business plans; and (vi) any and all analyses, compilations, or notes prepared which contain
                or are based on any of the above information.
                <br />
                <br /> 7.2 You agree to hold in confidence and not use or disclose any Confidential
                Information except in accordance with this Agreement. You may disclose Confidential
                Information, on a need-to-know basis, to your personnel who have agreed in writing to
                non-disclosure terms at least as protective as the provisions of this Section, for purposes
                permitted in this Agreement, subject to the condition that you shall be liable for their
                breach of this Section.
                <br />
                <br /> 7.3 The obligations set forth in this Section do not apply to Confidential
                Information that (i) is in or enters the public domain without breach of this Agreement,
                (ii) the receiving party lawfully receives from a third party without restriction on
                disclosure and without breach of a nondisclosure obligation, (iii) the receiving party knew
                prior to receiving such information from the disclosing party or develops independently
                without access or reference to the Confidential Information, (iv) is disclosed with the
                written approval of the disclosing party. Notwithstanding the Confidentiality Obligations
                set forth in this Section, each party may disclose Confidential Information of the other
                party as permitted by law (i) to the extent required by a court of competent jurisdiction or
                other governmental authority or otherwise as required by law but only after alerting the
                other party of such disclosure requirement and, prior to any such disclosure, allowing
                (where practicable to do so) the other party a reasonable period of time within which to
                seek a protective order against the proposed disclosure, or (ii) on a “need-to-know” basis
                under an obligation of confidentiality substantially similar in all material respects to
                those confidentiality obligations in this Section to its legal counsel, accountants,
                contractors, consultants, banks and other financing sources.
                <br />
                <br /> 7.4 You agree that any unauthorized disclosure of Confidential Information may cause
                immediate and irreparable injury to ChurchButton and that, in the event of such breach,
                ChurchButton will be entitled, in addition to any other available remedies, to immediate
                injunctive and other equitable relief, without bond and without the necessity of showing
                actual monetary damages.
              </div>
              <br />
              <br />
              8. INTELLECTUAL PROPERTY
              <br />
              <br />
              <div className="privacy-p">
                {' '}
                8.1 Service Materials. Unless otherwise indicated, the Service and all content (other than
                Customer Materials), including, without limitation, the ChurchButton trademarks, Faithmo
                mobile applicationlogos, and all designs, text, graphics, images, information, data,
                software, documentation, sound files, other files and the selection and arrangement thereof
                (collectively, the “Service Materials”) are the property of ChurchButton and are protected
                by U.S., Canadian, and international copyright, trade secret and other intellectual property
                laws. The following actions are specifically prohibited: (a) any resale, lease or rental of
                the Site or the Service Materials therein; (b) the distribution, public performance or
                public display of any Service Materials; (c) modifying or otherwise making any derivative
                uses of the Site, the Service Materials, or any portion thereof; (d) use of automated means,
                including spiders, robots, crawlers, offline readers, data mining tools, or the like to
                download data from the Site or Service or to cause an overload of ChurchButton servers ; (e)
                downloading (other than page caching) or copying any portion of the Site, the Service
                Materials or any information contained therein, except as expressly permitted; (f) any
                attempt to gain unauthorized access to ChurchButton’s computer systems or engage in any
                activity that disrupts, diminishes the quality of, interferes with the performance of, or
                impairs the functionality of, the Service; (g) collection or harvesting of any personally
                identifiable information, including, but not limited to, company names, domain names or
                account names, from the Service nor to use the communication systems provided by the Service
                for any commercial solicitation purposes; (h) use of any portion of the Service as a
                destination linked from any unsolicited bulk messages or unsolicited commercial messages;
                (i) any use of the Service or the Service Materials other than for their intended purpose.
                Any use of the Service or the Service Materials other than as specifically authorized
                herein, without the prior written permission of ChurchButton, is strictly prohibited and
                will terminate the license granted herein. Such unauthorized use may also violate applicable
                laws including without limitation copyright and trademark laws and applicable communications
                regulations and statutes. Unless explicitly stated herein, nothing in these Terms of Service
                shall be construed as conferring any license to intellectual property rights, whether by
                estoppel, implication or otherwise.
                <br />
                <br /> 8.2 Faithmo Mobile Application. You shall retain ownership of any and all logos, and
                all designs, text, graphics, images, information, data, software, sound files, other files
                and the selection and arrangement thereof provided by you for incorporation into, or
                provided by you through data feeds to, the Service, including but not limited to the Faithmo
                Mobile Application(“Customer Materials”). Inasmuch as the Faithmo Mobile Application is
                owned by ChurchButton, it may not be lawfully used outside of the Service. Only ChurchButton
                may post the Faithmo Mobile Application to the Apple iTunes App Store, Google Play, Windows
                Phone App Store, Amazon App Store, the web, or any other platform. The Faithmo Mobile
                Application shall not be transferred to or submitted on third party developer accounts
                except at ChurchButton’s discretion, though ChurchButton reserves the right to require the
                Faithmo Mobile Applicationbe transferred to or submitted by a third party developer account
                in your name. Any violation of the foregoing limitations may result in (without limitation)
                termination of the Service and/or termination of this Agreement.
              </div>
              <br />
              <br />
              9. COPYRIGHT POLICY
              <br />
              <br />
              ChurchButton respects the intellectual property rights of others and expects users of the
              Services to do the same. We will respond to notices of alleged copyright infringement that
              comply with applicable law and are properly provided to us. If you believe that your
              copyrighted materials have been copied in a way that constitutes copyright infringement,
              please provide us with the following information: (i) a physical or electronic signature of
              the copyright owner or a person authorized to act on their behalf; (ii) identification of the
              copyrighted work claimed to have been infringed; (iii) identification of the material that is
              claimed to be infringing or to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably sufficient to permit us to
              locate the material; (iv) your contact information, including your address, telephone number,
              and an email address; (v) a statement by you that you have a good faith belief that use of the
              material in the manner complained of is not authorized by the copyright owner, its agent, or
              the law; and (vi) a statement that the information in the notification is accurate, and, under
              penalty of perjury, that you are authorized to act on behalf of the copyright owner.
              <br />
              <br /> We reserve the right to remove Customer Materials alleged to be infringing without
              prior notice and at our sole discretion. In appropriate circumstances, ChurchButton will also
              terminate a user’s account if the user is determined to be a repeat infringer.
              <br />
              <br />
              10. LIMITATIONS ON USE OF THE SERVICE
              <br />
              <br />
              Any use of the Service that violates this Agreement is strictly prohibited and may result in
              your exclusion from the Service, and the removal of the Faithmo Mobile Application from any
              network, store, or server, and any other platform on which the Faithmo Mobile Application has
              been published. Unauthorized use may also violate applicable laws including without limitation
              copyright and trademark laws and applicable communications regulations and statutes. You agree
              to use the Service and any information obtained from the Service and your use thereof solely
              for the purposes authorized by these Terms of Service. You will not circumvent ChurchButton’s
              intended limitations for any feature of the Service as reflected in the ChurchButton
              documentation from time to time. You will not encourage or promote the use of the Service in
              any manner or for any purpose that is not permitted under these Terms of Service. You will not
              use or attempt to use the Service in any manner that is unfair, deceptive, or otherwise
              unlawful or harmful to ChurchButton, any ChurchButton clients, or any other third party.
              Unless explicitly stated herein, nothing in these Terms of Service shall be construed as
              conferring any license to intellectual property rights, whether by estoppel, implication or
              otherwise. You agree that your use of the Services shall be further governed by these Terms of
              Service, the Terms of Use, and any other relevant content and conduct rules of the platforms
              on which the Faithmo Mobile Applicationis published.
              <br />
              <br />
              11. USE ONLY BY YOUR ORGANIZATION AND ONWARD TRANSFERS
              <br />
              <br />
              You may not transfer or assign your rights under this Agreement to any third party and any
              attempt to do so shall be void.
              <br />
              <br /> The Service, including without limitation any Faithmo Mobile Application, shall only be
              distributed to end users by ChurchButton through the app networks, app stores, servers, and
              platforms selected by ChurchButton, utilizing in every case a form of license acceptable to
              ChurchButton. Violation of the provisions of this Section may result in deactivation of the
              Service, or any part thereof, without refund.
              <br />
              <br /> You may not make the Faithmo Mobile Application available to another entity for
              inclusion of its materials and you may not rent, lease, or sell the Service to third parties
              or otherwise provide other entities with the ability to distribute their materials through the
              Faithmo Mobile Applicationunless it is specifically identified as your materials. You agree
              not to resell, republish, duplicate, reproduce or exploit any part of the Service without
              ChurchButton’s prior written permission.
              <br />
              <br />
              If ChurchButton gathers personal information from EU data subjects on your behalf, you agree
              that such data may only be processed for limited and specified purposes consistent with
              consent provided for such data by the data subject and that you will provide the same level of
              protection as is required by the EU-U.S. Privacy Shield Principles.
              <br />
              <br />
              12. DATA FEEDS; RESTRICTIONS ON CUSTOMER MATERIALS POSTED
              <br />
              <br />
              You shall be solely responsible for establishing, and maintaining a connection to the
              Internet, and providing the required data feeds to support proper function of the Faithmo
              Mobile Application. By providing ChurchButton with Customer Materials, you grant ChurchButton
              an irrevocable, perpetual, royalty-free, fully sub-licensable, fully paid up, worldwide
              license to use, copy, transmit, publicly perform, digitally perform, publicly display, and
              distribute the Customer Materials through the Faithmo Mobile Application, the Site, and any
              platform, network, store, server, in the Internet. This license is non-exclusive, except you
              agree that ChurchButton shall have the exclusive right to combine Customer Materials with a
              Faithmo Mobile Application. You represent and warrant that you possess all rights needed to
              authorize ChurchButton to use, copy, transmit, publicly perform, digitally perform, publicly
              display and distribute the Customer Materials as provided herein.
              <br />
              <br /> You may not use the Service in a prohibited manner or include in the data feed any
              Customer Materials that is prohibited. ChurchButton reserves the right to investigate and take
              appropriate legal action in its sole discretion against anyone who violates this provision,
              including without limitation, removing the offending communication from the Customer Materials
              served through the Faithmo Mobile Application and terminating the violator’s Service without
              refund. We value integrity, truth, and respect for others, and we strive to avoid offending
              users with content, apps, or websites that are objectionable or inappropriate. For this
              reason, we don’t allow the publication or promotion of hatred; violence; racism; blasphemy; or
              sexual, religious, or political content or activity that violates or disparages traditional
              Christian scripture and values, or organizations with such views.
              <br />
              <br /> The following is prohibited: Harassment or perceived harassment of another person;
              Unsolicited mass mailings or “spam;” Customer Materials determined by ChurchButton to be
              illegal, or to violate any local, state, provincial, or federal law or regulation or the
              rights of any person or entity, or violate the rules or requirements of one or more mobile app
              platforms or mobile app stores; Harmful, offensive and abusive language, including but not
              limited to hate speech, expletives, harassment, obscenities, vulgarities, sexually explicit
              language, images, video or other materials that risk offending community standards (e.g.
              nudity, bestiality, pornography); Customer Materials that are inappropriate based on the
              subject matter; Customer Materials that are encrypted or that contains viruses or any other
              computer programming routines that are intended to damage, interfere with, intercept or
              appropriate any system or information; and Customer Materials that violate the intellectual
              property rights of any person.
              <br />
              <br /> You agree that you will only submit information that you believe to be true and you
              will not purposefully provide false or misleading information.
              <br />
              <br /> You further agree that you will not: Modify, adapt, translate, or reverse engineer any
              portion of the Service; Take any action that creates an unreasonably large load on our IT
              infrastructure; Use the Service to violate the security of any computer network, crack
              passwords or security encryption codes; transfer or store illegal material including that are
              deemed threatening or obscene; Create user accounts by automated means or under false or
              fraudulent pretenses; or Collect information about other users for any improper purpose.
              <br />
              <br />
              13. RIGHT TO UPGRADE SERVICE
              <br />
              <br />
              ChurchButton reserves the right to upgrade and/or change the Service at any time without
              notice.
              <br />
              <br />
              14. PAYMENT FOR SERVICES
              <br />
              <br />
              The service fee for any configuration services, media app publication services, maintenance
              services, or any other services provided to you by ChurchButton shall be the fees so described
              when you order these services through the Site. When you authorize ChurchButton to charge your
              credit card for the monthly service fees associated with the service plan selected by you, the
              Faithmo Mobile Application will be able to accept donations from your donors. ChurchButton
              shall charge your credit card in the amount of the agreed Monthly, Quarterly, or Annual fee
              each Month, Quarter, or Year in advance. You represent and warrant that all credit card,
              Automated Clearing House (ACH), and or other payment and related information that you provide
              to ChurchButton for such purposes shall be true and correct. You must promptly inform
              ChurchButton of any changes in your credit card information. You may make changes to your
              credit card information on your user profile webpage. All payments shall be made in U.S.
              dollars. The charges included here do not include taxes. If ChurchButton is required to pay
              any federal, state, provincial or local sales, use, property or value added taxes including,
              without limitation, GST and/or provincial sales tax based on the Service provided under this
              Agreement, the taxes shall be separately billed to you, unless you are able to provide proof
              of appropriate, qualifying tax exempt status. ChurchButton shall not pay any interest or
              penalties incurred due to late payment or nonpayment of such taxes by you. Upon your failure
              to pay monthly fees, you authorize ChurchButton to remove access to the Faithmo Mobile
              Application. Prepaid fees are non-refundable.
              <br />
              <br />
              15. NON-SOLICITATION AND NON-COMPETITION
              <br />
              <br />
              During the term of this Agreement and for a period of two years from the date your account
              expires or is terminated, you will not solicit those vendors or customers of ChurchButton that
              you learned of or with whom you developed relationships as a result of your relationship with
              ChurchButton nor will you divert or attempt to divert from ChurchButton any business
              ChurchButton enjoyed or solicited from such customers and to the extent that you gained
              Confidential Information from ChurchButton, you shall not enter into competition with
              ChurchButton in the United States or Canada.
              <br />
              <br />
              16. NONINTERFERENCE WITH CHURCHBUTTON EMPLOYEES
              <br />
              <br />
              During the time that your account is active and for two (2) years following, you agree that
              you will not:
              <br />
              <br />
              <div className="privacy-p">
                a) induce, or attempt to induce, any ChurchButton employee to quit ChurchButton’s employ,
                <br />
                <br /> b) recruit or hire away any ChurchButton employee, or
                <br />
                <br /> c) hire or engage any ChurchButton employee or former employee whose employment with
                ChurchButton ended less than one year before the date of such hiring or engagement.
              </div>
              <br />
              <br />
              17. WARRANTY
              <br />
              <br />
              ChurchButton does not guarantee acceptance of any Faithmo Mobile Application or data by Apple,
              Inc. or gatekeepers of other platforms, networks, stores or servers. If the Faithmo Mobile
              Application is rejected by them for code defects, ChurchButton will correct them and resubmit
              them as soon as reasonably possible. This warranty to you shall be null and void if you are in
              default under this Agreement.
              <br />
              <br />
              18. PATENTS
              <br />
              <br />
              One or more patents owned by, or patent applications submitted, by ChurchButton may apply to
              this Service and to the features or services accessible via the Service.
              <br />
              <br />
              19. ACCREDITATION AND PROMOTION
              <br />
              <br />
              The launch screen of the Faithmo Mobile Application shall bear a copyright notice and the
              branding of ChurchButton in the form, size and location chosen by ChurchButton in its
              discretion. The Faithmo Mobile Application’s graphical user interface shall display copyright
              information and the credit “Designed + Developed by ChurchButton” or similar credit in the
              form, size and location chosen by ChurchButton in its discretion. ChurchButton retains the
              right to reproduce, publish and display static screen shots, motion demos, and other
              representations of the Faithmo Mobile Applicationwith your name and logo in ChurchButton-owned
              and affiliated portfolios and websites, and in galleries, design periodicals and other media
              or exhibits for purposes of publicity. In the app stores and marketplaces, keywords
              “ChurchButton” and/or “Faithmo” must be included and credit to ChurchButton must be included
              in the app description. In all other places where the Faithmo Mobile Applicationis marketed or
              distributed, you shall add the following statement “Designed + Developed by ChurchButton.
              Copyright © 2021-2022ChurchButton” or similar credit in the form, size and location chosen by
              ChurchButton in its discretion, and include a link to the Site if the statement is made in
              electronic format.
              <br />
              <br />
              20. ENTIRE AGREEMENT
              <br />
              <br />
              This Agreement, together with the Terms of Use and any Statements of Work between you and
              ChurchButton or an affiliate thereof, constitutes the complete and exclusive statement of the
              agreement between the parties with respect to the use of the Services and any acts or
              omissions of ChurchButton and supersedes any and all prior or contemporaneous communications,
              representations, statements and understandings, whether oral or written, between the parties.
              In the event of a conflict between or among the terms of the Terms of Use, Terms of Service,
              and Statements of Work, the order of precedence shall be, from first to last: the Statements
              of Work, the Terms of Service, and lastly the Terms of Use. If you have entered into a
              separate agreement (other than subsequent revisions of the Terms of Use) with ChurchButton,
              and there is conflict between that agreement and these Terms of Service or the Terms of Use,
              the terms of that agreement shall control to the extent such agreement is still in effect.
            </div>
          </article>
        );
      default:
        return '';
    }
  };
  return (
    <>
      {' '}
      <div className="FaithmoAuth__bottom">
        <div />
        <span className="FaithmoAuth__terms" role="button" onClick={() => handleOpenModal('privacy')}>
          Privacy Policy
        </span>
        <span className="FaithmoAuth__terms" role="button" onClick={() => handleOpenModal('terms')}>
          Terms and Conditions
        </span>
        <span className="FaithmoAuth__copyright">Ⓒ 2021 Faithmo</span>
      </div>
      <TransparentModal
        className="privacy-terms-modal"
        open={openModal}
        onClose={handleCloseModal}
        padding={0}
        style={{ textAlign: 'left' }}
        rootStyle={{ backgroundColor: 'none' }}
      >
        {getModalContent()}
      </TransparentModal>
    </>
  );
}
