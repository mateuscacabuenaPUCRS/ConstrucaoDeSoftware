import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
// import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
