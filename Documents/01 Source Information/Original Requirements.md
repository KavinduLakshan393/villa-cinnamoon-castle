> [!IMPORTANT]
> **Historical Source Document — Not the Current Implementation Scope**  
> This file preserves the client's original requirements for traceability. The authoritative current Phase 1 scope is defined by [`SRS.md`](../02%20Requirements/SRS.md), version 1.3.0 or later. Where this document conflicts with the SRS, the SRS takes precedence. Booking storage, admin approval/decline workflows, automated date blocking, and on-site direct reviews are deferred to Phase 2.

***Requirements***



***For the customers :***



0\. No authorization required for customers.

1. In-detail property elaboration including a property tour while still protecting the standards of a real estate website. I am requiring a property elaboration while scrolling. I think you know what I mean here. A customer first want to explore the property, so they must first see the property. So, using the images given , decide how this flow should happen. This elaboration must include the bedrooms, living rooms, kitchen and dining and everything other.  
2. Package booking through site. (Only booking required. The inquiry is sent to the admin end.). This requires a form to get details from the customer.
3. A review section to the customers who has accepted their bookings through the site. This review unlocks to them when the check-in date arrives. This is because first they actually want to see the villa to add a review. I think it is practical. The reviewed messages of the customers can be viewed by any visitors and they are always visible in the website in the reviews section.
4. The pages available to the customer must be decided by you.
5. Must be responsive and completely mobile friendly.





For the customers when selecting packages, following below should be the order of mini-forms must appear :

1. Ask preferred dates first - A form should appear for to ask date(s) (one date or date range from available dates.). Site should automatically block the unavailable dates for the customers. If dates unavailable, they must highlighted in red color in the calendar. And make those unavailable dates unclickable.



2\. After customer selecting available dates successfully, next mini-form should open to get the guest count.



3\. Then final mini-form should appear to get the details of the package that customer chooses. Also two text fields to enter Customer name and customers' WhatsApp number (this mobile number field should handle with Regex)





This request should save in the database with an id and also send to the admin end to further review. Admin must able to approve those requests or decline them with the season of decline. This approval message and decline message must be sent via WhatsApp.







***For the Admin :***

1. Admin authentication required.
2. Admin should able to manage booking requests sent by customers. Admin must see the request by the customer name and the other details customer entered. And then Admin must able to Approve them or decline them with the message of reason.
3. Admin should able to manage the reviews which are currently shown in the website. Manage means not to alter them. Just to hide them or pin them.
4. Admin should able to manage the package details (full CRUD).











=================================================================================================



