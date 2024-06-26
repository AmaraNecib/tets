'use server'
type User = {
  id: number;
  name: string;
  email: string;
  phoneNumbers: {
    isPrimary: boolean;
    phoneNumber: string;
  }[];
};

import { prisma } from "@/lib/db";
// Removed the unused 'Admin' type declaration
export const getAdmins = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          name: "admin",
        },
      },
      include: {
        phoneNumbers: {
          where: {
            isPrimary: true,
          },
        },
      },
    });

    const filteredUsers: User[] = users.map((user) => ({
      id: user.id,
      name: user.firstName + " " + user.lastName || "", // Provide a default value for name
      email: user.email,
      phoneNumbers: user.phoneNumbers,
    }));

    const data = filteredUsers.map((user) => {
      const primaryPhoneNumber = user.phoneNumbers.length > 0
        ? user.phoneNumbers[0].phoneNumber
        : "غير متوفر";

      return {
        id: user.id,
        email: user.email,
        name: user.name || "غير متوفر",
        phone: primaryPhoneNumber,
      };
    });

    console.log(data);
    return data;

    // const filteredUsers: User[] = users.map((user) => ({
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   phoneNumbers: user.phoneNumbers,
    // }));


    // const data = filteredUsers.map((user) => {
    //   const primaryPhoneNumber = user.phoneNumbers.length > 0
    //     ? user.phoneNumbers[0].phoneNumber  // Assuming the first phone number in the array is primary
    //     : "غير متوفر";

    //   return {
    //     id: user.id,
    //     email: user.email,
    //     name: user.name || "غير متوفر",
    //     phone: primaryPhoneNumber,
    //   };
    // });

    // console.log(data);
    // return data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    return null;
  }
};

export type Admin = {
  id: number;
  name: string;
  email: string;
  phone: string;
};