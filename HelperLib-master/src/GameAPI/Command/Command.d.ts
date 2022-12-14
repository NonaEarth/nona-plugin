/// <reference path="../../index.ts" />

/**
 * ### ð¯ æä»¤å¯¹è±¡
 *
 * éè¿å¯¹æ¥ BDS åç½®çå½ä»¤ç³»ç»ï¼ä½ æ³¨åçå½ä»¤å¯ä»¥ç±ç©å®¶ãæ§å¶å°ãå½ä»¤æ¹åãNPCç­åç§æ¸¸æä¸­å¯ä»¥æ§è¡å½ä»¤çå¯¹è±¡æä½¿ç¨ï¼\
 * å¨ addon ä¸­ï¼ä¹å¯ä»¥ä½¿ç¨è¿éææ³¨åçå½ä»¤ã
 *
 * éè¿æä»¤å¯¹è±¡ï¼ä½ å¯ä»¥ä¸ºè¿ä¸ªå½ä»¤æ³¨ååå¼åæ ·çå½¢å¼ãåè½ã
 *
 * è¯¥ç±»**æ²¡ææé å½æ°**ï¼è¯·ä½¿ç¨{@linkcode mc.newCommand()}åå»º
 *
 * @see [ð¯ å½ä»¤æ³¨åAPI](https://docs.litebds.com/zh-Hans/#/LLSEPluginDevelopment/GameAPI/Command)
 */
declare class Command {
  readonly name: string;

  readonly registered: boolean;

  /**
   * ### è®¾ç½®æä»¤å«å
   *
   * @param alias æä»¤å«å
   *
   * @returns æ¯å¦æåè®¾ç½®
   */
  setAlias(alias: string): boolean;

  /**
   * ### æ°å¢ä¸ä¸ªæä»¤æä¸¾éé¡¹
   *
   * @param name æä¸¾åï¼ç¨äºè®¾ç½®åæ°æ¶åºåæä¸¾
   * @param values æä¸¾çææå¼
   *
   * @returns æ¯å¦æåè®¾ç½®
   */
  setEnum(name: string, values: Array<string>): boolean;

  /**
   * ### æ°å¢ä¸ä¸ªå¿éåæ°
   *
   * @param name åæ°åï¼ç¨äºæ§è¡æä»¤æ¶è¯å«åæ°
   * @param type å½ä»¤åæ°ç±»å
   * @param enumName æä¸¾åï¼ä» `ParamType` ä¸º `Enum` æ¶ææï¼ç¨äºåºåæä¸¾éé¡¹ï¼
   * @param identifier åæ°æ è¯ï¼ç¹æ®æåµä¸ç¨äºå¯ä¸è¯å«åæ°ï¼ä¸è¬å¯ç¨ `enumName` æ `name` ä»£æ¿
   * @param enumOptions åæ°éé¡¹ï¼è®¾ç½®ä¸º `1` å¯å¨æä»¤æç¤ºä¸­å±å¼æä¸¾éé¡¹ï¼å¦ `<action : TagChangeAction>` ä¼åæ `<add|remove>`
   *
   * @returns æ¯å¦æåè®¾ç½®
   */
  mandatory(
    name: string,
    type: ParamType,
    enumName?: string,
    identifier?: string,
    enumOptions?: number
  ): boolean;

  /**
   * ### æ°å¢ä¸ä¸ªå¯éåæ°
   *
   * @param name åæ°åï¼ç¨äºæ§è¡æä»¤æ¶è¯å«åæ°
   * @param type å½ä»¤åæ°ç±»å
   * @param enumName æä¸¾åï¼ä» `ParamType` ä¸º `Enum` æ¶ææï¼ç¨äºåºåæä¸¾éé¡¹ï¼
   * @param identifier åæ°æ è¯ï¼ç¹æ®æåµä¸ç¨äºå¯ä¸è¯å«åæ°ï¼ä¸è¬å¯ç¨ `enumName` æ `name` ä»£æ¿
   * @param enumOptions åæ°éé¡¹ï¼è®¾ç½®ä¸º `1` å¯å¨æä»¤æç¤ºä¸­å±å¼æä¸¾éé¡¹ï¼å¦ `<action : TagChangeAction>` ä¼åæ `<add|remove>`
   *
   * @returns æ¯å¦æåè®¾ç½®
   */
  optional(
    name: string,
    type: ParamType,
    enumName?: string,
    identifier?: string,
    enumOptions?: number
  ): boolean;

  setSoftEnum(arg1: string, arg2: Array<string>): string;

  addSoftEnumValues(arg1: string, arg2: Array<string>): boolean;

  removeSoftEnumValues(arg1: string, arg2: Array<string>): boolean;

  getSoftEnumValues(arg1: string): Array<string>;

  getSoftEnumNames(): Array<string>;

  /**
   * ### æ°å¢ä¸æ¡æä»¤éè½½
   *
   * **ç¼èæ³¨**ï¼å¿é¡»å¨è°ç¨{@linkcode Command.setup()}åè°ç¨æ­¤å½æ°ï¼å¦åä¼æ¥é
   *
   * æä»¤éè½½æ¯ BDS åºåä¸åæä»¤å½¢å¼çæ¹æ³ï¼æ¯ä¸ç§ä¸åçæä»¤å½¢å¼å¯¹åºçä¸ç§æä»¤éè½½ã
   *
   * å¦ä½ æè§ï¼æä»¤éè½½ä¸­æä¾çåé¡¹åæ°åç»æäºä¸ç§æ°çæä»¤å½¢å¼
   *
   * @param params åæ°æ è¯ç¬¦ï¼éè½½æç¨å°çåæ°åè¡¨ï¼å¯ç¨ åæ°æ è¯ç¬¦ãæä¸¾åãåæ°åã
   *
   * æ³¨æä¸è½ä½¿ç¨æ æ³åºåå·ä½åæ°çæ è¯ç¬¦ï¼å¦ä¸¤ä¸ªåæ°é½å« `action` ä½æä¸¾éé¡¹ä¸åï¼æ­¤æ¶åºè¯¥ä½¿ç¨æä¸¾åèä¸æ¯åæ°å
   *
   * @returns  æ¯å¦æåè®¾ç½®
   */
  overload(params?: Array<string>): boolean;

  /**
   * ### è®¾ç½®æä»¤åè°
   *
   * @param callback æ³¨åçè¿ä¸ªå½ä»¤è¢«æ§è¡æ¶ï¼æ¥å£èªå¨è°ç¨çåè°å½æ°ã
   *
   * @returns æ¯å¦æåè®¾ç½®
   */
  setCallback(
    callback: (
      cmd: Command,
      origin: CommandOrigin,
      output: CommandOutput,
      result: object
    ) => void
  ): boolean;

  /**
   * ### å®è£æä»¤
   *
   * **ç¼èæ³¨**ï¼è¯·å¨è°ç¨æ­¤å½æ°åè°ç¨{@linkcode Command.overload()}ï¼å¦åä¼æ¥é
   *
   * @returns æ¯å¦æåå®è£
   */
  setup(): boolean;
}
