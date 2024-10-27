import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UserDTO } from "../dto/user.dto";
import { UserService } from "../service/user.service";
import { UserController } from "./user.controller";

describe("UserController", () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    login: jest.fn(),
    toggleNotifications: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getAllUsers", () => {
    it("should return an array of users", async () => {
      const result: UserDTO[] = [{ id: 1, name: "User 1" } as UserDTO];
      mockUserService.getAllUsers.mockResolvedValue(result);

      expect(await controller.getAllUsers()).toBe(result);
    });

    it("should throw an internal server error if service fails", async () => {
      mockUserService.getAllUsers.mockRejectedValue(new Error("Error"));

      await expect(controller.getAllUsers()).rejects.toThrow(HttpException);
    });
  });

  describe("getUserById", () => {
    it("should return a user by ID", async () => {
      const result: UserDTO = { id: 1, name: "User 1" } as UserDTO;
      mockUserService.getUserById.mockResolvedValue(result);

      expect(await controller.getUserById(1)).toBe(result);
    });

    it("should throw a not found error if user does not exist", async () => {
      mockUserService.getUserById.mockResolvedValue(null);

      await expect(controller.getUserById(1)).rejects.toThrow(HttpException);
    });

    it("should throw an internal server error if service fails", async () => {
      mockUserService.getUserById.mockRejectedValue(new Error("Error"));

      await expect(controller.getUserById(1)).rejects.toThrow(HttpException);
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const result: UserDTO = { id: 1, name: "User 1" } as UserDTO;
      mockUserService.createUser.mockResolvedValue(result);

      expect(await controller.createUser({
        name: "User 1",
        email: "user1@email.com",
        receiveNotifications: false,
        tenantId: 1
      })).toBe(result);
    });

    it("should throw a bad request error if user name is missing", async () => {
      mockUserService.createUser.mockRejectedValue(new HttpException("User name is required", 400));

      await expect(controller.createUser({
        email: "",
        name: null,
        receiveNotifications: false,
        tenantId: 0
      })).rejects.toThrow(HttpException);
    });

    it("should throw an internal server error if service fails", async () => {
      mockUserService.createUser.mockRejectedValue(new Error("Error"));

      await expect(controller.createUser({
        name: "User 1",
        email: "user1@email.com",
        receiveNotifications: false,
        tenantId: 1
      })).rejects.toThrow(HttpException);
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const result: UserDTO = { id: 1, name: "Updated User" } as UserDTO;
      mockUserService.getUserById.mockResolvedValue(result);
      mockUserService.updateUser.mockResolvedValue(result);

      expect(await controller.updateUser(1, {
        name: "Updated User",
        email: "updateduser@email.com",
        receiveNotifications: true,
        tenantId: 1
      })).toBe(result);
    });

    it("should throw a not found error if user does not exist", async () => {
      mockUserService.getUserById.mockResolvedValue(null);

      await expect(controller.updateUser(1, {
        name: "Updated User",
        email: "updateduser@email.com",
        receiveNotifications: true,
        tenantId: 1
      })).rejects.toThrow(HttpException);
    });

    it("should throw an internal server error if service fails", async () => {
      mockUserService.updateUser.mockRejectedValue(new Error("Error"));

      await expect(controller.updateUser(1, {
        name: "Updated User",
        email: "updateduser@email.com",
        receiveNotifications: true,
        tenantId: 1
      })).rejects.toThrow(HttpException);
    });
  });

  describe("deleteUser", () => {
    it("should delete a user by ID", async () => {
      const result: UserDTO = { id: 1, name: "User 1" } as UserDTO;
      mockUserService.getUserById.mockResolvedValue(result);
      mockUserService.deleteUser.mockResolvedValue(result);

      expect(await controller.deleteUser(1)).toBe(result);
    });

    it("should throw a not found error if user does not exist", async () => {
      mockUserService.getUserById.mockResolvedValue(null);

      await expect(controller.deleteUser(1)).rejects.toThrow(HttpException);
    });

    it("should throw an internal server error if service fails", async () => {
      mockUserService.deleteUser.mockRejectedValue(new Error("Error"));

      await expect(controller.deleteUser(1)).rejects.toThrow(HttpException);
    });
  });

  describe("toggleNotifications", () => {
    it("should toggle notifications for a user", async () => {
      const result: UserDTO = { id: 1, name: "User 1", receiveNotifications: true } as UserDTO;
      mockUserService.getUserById.mockResolvedValue(result);
      mockUserService.toggleNotifications.mockResolvedValue(result);

      expect(await controller.toggleNotifications(1)).toBe(result);
    });

    it("should throw a not found error if user does not exist", async () => {
      mockUserService.getUserById.mockResolvedValue(null);

      await expect(controller.toggleNotifications(1)).rejects.toThrow(HttpException);
    });

    it("should throw an internal server error if service fails", async () => {
      mockUserService.toggleNotifications.mockRejectedValue(new Error("Error"));

      await expect(controller.toggleNotifications(1)).rejects.toThrow(HttpException);
    });
    });
});