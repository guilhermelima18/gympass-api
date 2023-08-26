import { hash } from "bcryptjs"
import { prisma } from "@/libs/prisma"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string
}

class RegisterUseCase {
  constructor(private userRepository: any) { }

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (userWithSameEmail) {
      throw new Error("E-mail already exists.")
    }

    await this.userRepository.create({
      name,
      email,
      password_hash
    })
  }
}

export { RegisterUseCase }