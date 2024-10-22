import { DataSource } from 'typeorm';
import { EventEntity } from '../event/entity/event.entity';
import { TenantEntity } from '../tenant/entity/tenant.entity';
import { TicketEntity } from '../ticket/entity/ticket.entity';
import { UserEntity } from '../user/entity/user.entity';

async function seedTenants(dataSource: DataSource) {
  const tenantRepository = dataSource.getRepository(TenantEntity);

  // Check if the default data already exists (optional)
  const tenantCount = await tenantRepository.count();
  if (tenantCount > 0) {
    console.log('Tenants already exist, skipping seed.');
    return;
  }

  // Insert default tenants
  const defaultTenants: TenantEntity[] = await Promise.all([
    tenantRepository.create({
      name: 'Admins',
      email: 'admins@system.com',
      phone: '+1234567890',
      timezone: 'UTC',
      currency: 'USD',
    }),
    tenantRepository.create({
      name: 'Sellers - Inter',
      email: 'sellers@inter.system.com',
      phone: '+1234567890',
      timezone: 'UTC',
      currency: 'USD',
    }),
    tenantRepository.create({
      name: 'Sellers - Grêmio',
      email: 'buyers@system.com',
      phone: '+1234567890',
      timezone: 'UTC',
      currency: 'USD',
    }),
    tenantRepository.create({
      name: 'Buyers - Inter',
      email: 'buyers@inter.system.com',
      phone: '+1234567890',
      timezone: 'UTC',
      currency: 'USD',
    }),
    tenantRepository.create({
      name: 'Buyers - Grêmio',
      email: 'buyers@gremio.system.com',
      phone: '+1234567890',
      timezone: 'UTC',
      currency: 'USD',
    }),
  ]);
  await tenantRepository.save(defaultTenants);
}

async function seedUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(UserEntity);

  // Check if the default data already exists (optional)
  const userCount = await userRepository.count();
  if (userCount > 0) {
    console.log('Users already exist, skipping seed.');
    return;
  }

  // Insert default users
  const defaultUsers: UserEntity[] = await Promise.all([
    userRepository.create({
      name: 'Admin POA',
      email: 'admin@poa.system.com',
      receiveNotifications: true,
      tenantId: 1,
    }),
    userRepository.create({
      name: 'Mateus',
      email: 'mateus@colorado.com',
      receiveNotifications: false,
      tenantId: 2,
    }),
    userRepository.create({
      name: 'Felipe',
      email: 'felipe@gremista.com',
      receiveNotifications: false,
      tenantId: 3,
    }),
    userRepository.create({
      name: 'Carolina',
      email: 'carolina@colorado.com',
      receiveNotifications: false,
      tenantId: 4,
    }),
    userRepository.create({
      name: 'Luiza',
      email: 'luiza@gremista.com',
      receiveNotifications: false,
      tenantId: 5,
    }),
  ]);
  await userRepository.save(defaultUsers);
}

async function seedEvents(dataSource: DataSource) {
  const eventRepository = dataSource.getRepository(EventEntity);

  // Check if the default data already exists (optional)
  const eventCount = await eventRepository.count();
  if (eventCount > 0) {
    console.log('Events already exist, skipping seed.');
    return;
  }

  // Insert default events
  const defaultEvents: EventEntity[] = await Promise.all([
    eventRepository.create({
      name: 'GRENAL',
      type: 'Jogo de Futebol',
      location: 'Beira-Rio',
      tenantId: 1,
    }),
  ]);
  await eventRepository.save(defaultEvents);
}

async function seedTickets(dataSource: DataSource) {
  // Implement the seedTickets function
  const ticketRepository = dataSource.getRepository(TicketEntity);

  // Check if the default data already exists (optional)
  const ticketCount = await ticketRepository.count();
  if (ticketCount > 0) {
    console.log('Tickets already exist, skipping seed.');
    return;
  }

  // Insert default tickets
  const defaultTickets: TicketEntity[] = await Promise.all([
    ticketRepository.create({
      eventId: 1,
      tenantId: 2,
      sellerId: 2,
      originalPrice: 100.0,
      verificationCode: 123456,
      status: 'pending',
    }),
    ticketRepository.create({
      eventId: 1,
      tenantId: 3,
      sellerId: 3,
      originalPrice: 100.0,
      verificationCode: 123456,
      status: 'pending',
    }),
  ]);
  await ticketRepository.save(defaultTickets);
}

export async function seedDatabase(dataSource: DataSource) {
  await seedTenants(dataSource);
  await seedUsers(dataSource);
  await seedEvents(dataSource);
  await seedTickets(dataSource);
}
