//utils
import { FlowUtils } from "./utils/FlowUtils";

export { FlowUtils };

//infra
import { BaseController } from "./infra/BaseController";
import { Mapper } from "./infra/Mapper";

export { Mapper, BaseController };

//core
import { AppError } from "./core/AppError";
import { Guard } from "./core/Guard";
import { Result } from "./core/Result";
import * as Monad from "./core/Monad";
import { Either } from "./core/Either";
import { UseCase } from "./core/UseCase";
import { UseCaseError } from "./core/UseCaseError";
import { DomainError } from "./core/DomainError";
import { WithChanges } from "./core/WithChanges";
import { Error } from "./core/Error";

export {
  AppError,
  Guard,
  Monad,
  Result,
  UseCase,
  UseCaseError,
  WithChanges,
  DomainError,
  Either,
  Error,
};
//core
import { AggregateRoot } from "./domain/AggregateRoot";
import { DomainService } from "./domain/DomainService";
import { Entity } from "./domain/Entity";
import { Identifier } from "./domain/Identifier";
import { UniqueEntityID } from "./domain/UniqueEntityID";
import { ValueObject } from "./domain/ValueObject";
import { WatchedList } from "./domain/WatchedList";
import { DomainEvents } from "./domain/events/DomainEvents";
import { IDomainEvent } from "./domain/events/IDomainEvent";
import { IHandle } from "./domain/events/IHandle";

export {
  AggregateRoot,
  DomainService,
  Entity,
  Identifier,
  UniqueEntityID,
  ValueObject,
  WatchedList,
  DomainEvents,
  IDomainEvent,
  IHandle,
};
