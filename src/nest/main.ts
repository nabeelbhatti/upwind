import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import * as session from 'express-session'
// import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   session({
  //     secret: 'login Session for user', 
  //     resave: true, 
  //     saveUnintialized: true, 
  //     cooke: {maxAge: 3600000}
  //   })
  // )
  // app.use(passport.initialize())
  // app.use(passport.session()) 
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
