import { UPlugin } from '@classes';
import { UnpatchFunction } from '@patcher';
import _ from 'lodash';

import nitroChecks from './patches/nitroChecks';
import sendMessage from './patches/sendMessage';

export default class FreeNitro extends UPlugin {
  public patches: UnpatchFunction[] = [];

  start() {
    this.patches.push(nitroChecks(), sendMessage());
  }

  stop() {
    _.forEachRight(this.patches, (p) => p());
  }
}
