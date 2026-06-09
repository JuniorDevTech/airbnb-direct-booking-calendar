import bcrypt from "bcryptjs";
import * as userRepository from "./user.repository.js";

export const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  return user;
};

export const updateProfile = async (userId, data) => {
  const existingEmail = await userRepository.findByEmail(data.email);

  if (existingEmail && existingEmail.id !== userId) {
    throw new Error("Cet email est déjà utilisé");
  }

  return userRepository.update(userId, {
    name: data.name,
    email: data.email,
  });
};

export const deleteProfile = async (userId) => {
  return userRepository.remove(userId);
};

export const changeUserPassword = async (userId, data) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const isMatch = await bcrypt.compare(data.currentPassword, user.password);

  if (!isMatch) {
    throw new Error("Ancien mot de passe incorrect");
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,
    },
  });

  return true;
};
