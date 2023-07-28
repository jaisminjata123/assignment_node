const db = require("../config/dbConnection");
const customerModel = db.customerModel;
const Op = db.Sequelize.Op;

module.exports.identifyCustomer = async (data) => {
  try {
    let email = data.email;
    let phoneNumber = data.phoneNumber;
    let secondaryContacts = [];
    let result;
    let primaryContact;
    const customerContacts = await this.getCustomerContacts(email, phoneNumber);
    if (
      ((email == null && phoneNumber != null) ||
        (phoneNumber == null && email != null)) &&
      customerContacts.length != 0
    ) {
      primaryContact = await this.getPrevPrimary();
      result = {
        primaryContactId: primaryContact.contact_id,
        emails: [primaryContact.email],
        phoneNumbers: [primaryContact.phone_number],
        secondaryContactIds: [],
      };
      return result;
    }
    if (email != null && phoneNumber != null) {
      const extractedContacts = customerContacts.filter(
        (c) => c.phone_number == phoneNumber && c.email == email
      );
      if (extractedContacts.length != 0) {
        primaryContact = await this.getPrevPrimary();
        result = {
          primaryContactId: primaryContact.contact_id,
          emails: [primaryContact.email],
          phoneNumbers: [primaryContact.phone_number],
          secondaryContactIds: [],
        };
        return result;
      }
    }
    let secondaryContactIds = [];
    if (customerContacts.length != 0) {
      data.precedence = "secondary";
      primaryContact = await this.getPrevPrimary();
      //let updatePrevPrimary = await this.updatePrevPrimary(prevPrimary);
      data.linkedId = primaryContact.contact_id;
      let secondaryContact = await this.createContact(data);
      secondaryContacts = await this.getAllSecondary(
        data,
        primaryContact.contact_id
      );
      let updateLinkedId = await this.updateLinkedId(
        secondaryContacts,
        primaryContact
      );
    } else {
      data.precedence = "primary";
      data.linkedId = null;
      primaryContact = await this.createContact(data);
      console.log(primaryContact);
    }
    if (secondaryContacts.length != 0) {
      const uniquePhoneNumbers = new Set();
      const uniqueEmail = new Set();
      if (primaryContact.phone_number) {
        uniquePhoneNumbers.add(primaryContact.phone_number);
      }
      if (primaryContact.email) {
        uniqueEmail.add(primaryContact.email);
      }
      for (let contact of secondaryContacts) {
        if (contact.phone_number) {
          uniquePhoneNumbers.add(contact.phone_number);
        }
        if (contact.email) {
          uniqueEmail.add(contact.email);
        }
      }
      const finalPhoneNumbers = Array.from(uniquePhoneNumbers);
      const finalEmails = Array.from(uniqueEmail);
      secondaryContactIds = secondaryContacts.map(
        (contact) => contact.customer_id
      );
      result = {
        primaryContactId: primaryContact.contact_id,
        emails: finalEmails,
        phoneNumbers: finalPhoneNumbers,
        secondaryContactIds: secondaryContacts.map(
          (contact) => contact.contact_id
        ),
      };
    } else {
      result = {
        primaryContactId: primaryContact.contact_id,
        emails: [primaryContact.email],
        phoneNumbers: [primaryContact.phone_number],
        secondaryContactIds,
      };
    }
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports.getCustomerContacts = async (email, phoneNumber) => {
  let result = await customerModel.findAll({
    raw: true,
    where: {
      [Op.or]: [{ email: email }, { phone_number: phoneNumber }],
    },
  });
  return result;
};

module.exports.createContact = async (data) => {
  let result = await customerModel.create(
    {
      email: data.email,
      phone_number: data.phoneNumber,
      linked_id: data.linkedId,
      link_precedence: data.precedence,
      deleted_at: null,
    },
    { raw: true }
  );
  return result;
};
module.exports.getPrevPrimary = async () => {
  let result = await customerModel.findOne({
    raw: true,
    link_precedence: "primary",
  });
  return result;
};
module.exports.updatePrevPrimary = async (data) => {
  let result = await customerModel.update(
    { link_precedence: data.link_precedence },
    {
      where: {
        contact_id: data.contact_id,
      },
    }
  );
};
module.exports.getAllSecondary = async (data, contact_id) => {
  let result = await customerModel.findAll({
    raw: true,
    where: {
      [Op.or]: [{ email: data.email }, { phone_number: data.phoneNumber }],
      contact_id: {
        [Op.ne]: contact_id,
      },
    },
  });
  return result;
};
module.exports.updateLinkedId = async (customers, primaryContact) => {
  for (let contact of customers) {
    contact.linked_id = primaryContact.contact_id;
  }

  await customerModel.bulkCreate(customers, {
    updateOnDuplicate: ["linked_id"],
  });
};
