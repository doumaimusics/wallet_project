<template>
    <div id="Investment">
        <div class="bg"></div>
        <div class="xubox_layer">
            <div class="title">浙商银行网络借贷交易资金存管业务三方协议
                <div class="del reg" @click='InvestmentFalg'>
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <div class="xubox_page">
                <div class="content">
                    <p class="bold">甲方：{{name}} （{{id}}）</p>
                    <p class="bold">甲方声明：</h3>
                    <p>兹声明甲方在申请办理网络借贷资金存管业务前已仔细阅读并理解《浙商银行网络借贷交易资金存管业务三方协议》，
                        <span class="bold">甲方已明确知晓丙方仅负责网络借贷资金存管，即丙方按照甲方申请或指令办理存管账户开立、充值、划款、提现等业务；
                        丙方不负责审核乙方所提供融资人和融资项目的真实性和合法性、不保障融资人和融资项目必然还款、
                        也不保障甲方能够获得乙方融资项目下的本金和预期收益。甲方完全同意和接受本协议的全部条款和内容，
                        愿意履行和承担本协议中约定的权利和义务。</span>
                        </p>
                    <p class="bold">乙方(网络借贷平台)：E都市钱包</p>
                    <p class="bold">丙方：浙商银行有限公司</p>
                    <p class="bold">鉴于：</p>
                    <p>甲方为在乙方平台成功注册的用户，乙方和丙方连通网络借贷交易资金存管系统（以下简称“存管系统”），乙方和丙方已签订《网络借贷交易资金存管协议》（以下简称“存管协议”）。</p>
                    <p>为此，甲、乙、丙三方依据《中华人民共和国商业银行法》、《中华人民共和国合同法》、乙方交易及结算规则、
                        丙方账户管理及结算规则和其他有关法律、法规、规章以及相关规定，就甲方在乙方进行网络借贷交易，
                        丙方存管甲方网络借贷交易资金，及其他相关事宜达成《浙商银行网络借贷交易资金存管业务三方协议》
                        （以下简称“本协议”），供三方共同遵守，如乙丙双方签署的《存管协议》与本协议不一致的，以本协议为准。
                    </p>
                    <p class="bold">为了保障甲方的合法权益，请甲方在注册或使用丙方账户服务前，详细阅读本协议。甲方注册或使用账户时，即表示甲方已充分知晓并理解本协议之含义，并在此基础上接受本协议之全部内容。</p>
                   <!-- 第一章 -->
                    <p class='center bold'>第一章 三方声明</p>
                    <!-- 第一条 -->
                    <p class="bold">第一条 甲方声明如下：</p>
                    <p>
                        （一）甲方具有相应合法的出借或融资等资格，不存在法律、法规、规章、其他规范性文件和乙方交易规则禁止或
                        限制其在乙方进行网络借贷交易的情形，甲方的角色包括但不限于出借人、融资人、担保人、渠道方及其他与网络
                        借贷交易相关的主体等。
                    </p>
                    <p>
                        （二）甲方保证其向乙方、丙方提供的所有证件、资料均合法、真实、准确、完整和有效。甲方资料发生变化时，
                        甲方必须按照约定的要求，及时通知乙方和丙方。
                    </p>
                    <p>
                        （三）甲方保证其资金来源合法合规、且允许进行出借性交易。
                    </p>
                    <p>
                        （四）乙方已向甲方清楚揭示网络借贷交易风险，甲方已明确知晓并愿意承担网络借贷交易风险。
                    </p>
                    <p class="bold">
                        （五）甲方已明确知晓丙方仅负责网络借贷交易资金存管，即按照甲方申请或指令办理存管账户开立、充值、划款、
                        提现等业务；丙方不负责审核乙方所提供融资人和融资项目的真实性和合法性、不保障融资人和融资项目必然还款、
                        也不保障甲方能够获得乙方融资项目本金和预期收益。
                    </p>
                    <p>
                        （六）甲方知悉并确认其通过乙方平台发起、由乙方交互给丙方并通过丙方验证的存管划转指令，均为甲方本人发
                        起，甲方不得对上述指令的真实有效性提出异议。
                    </p>
                    <p>
                        （七）甲方同意遵守有关的法律、法规及乙方交易规则。
                    </p>
                    <p class="bold">
                        （八）甲方已详细阅读本协议所有条款，准确理解其含义，特别是其中有关乙方、丙方的责任条款，并同意本协议
                        所有条款。
                    </p>
                    <!-- 第二条 -->
                    <p class="bold">第二条 乙方声明如下：</p>
                    <p>（一）乙方是依法设立的网络借贷平台(以下简称“平台”)[E都市钱包]的运营商，具有相应的资格开展网络借贷相关业务。</p>
                    <p class="bold">
                        （二）乙方承诺其平台注册的出借人、融资人和融资项目的真实性和合法性，不存在任何虚假融资人和融资项目，
                        不存在为融资人虚构融资项目、故意隐瞒融资项目重大瑕疵等损害出借者合法权益的情形，并承担由此而可能引发
                        的经济及法律责任。乙方负责对甲方进行身份识别，对甲方资金来源进行合法合规性审核。
                    </p>
                    <p class="bold">
                        （三）乙方承诺其通过自身服务系统向丙方系统所提交的任何支付指令和推送的任何数据的真实性、完整性、准确
                        性、合法性；如因该类指令或数据信息不准确、不真实、不完整、不合法而可能导致甲方或丙方等相关方损失的，
                        乙方承诺承担赔偿责任。
                    </p>
                    <p>（四）乙方遵守有关的法律、法规及交易和结算规则。</p>
                    <p>（五）乙方已详细阅读本协议所有条款，准确理解其含义，特别是其中有关丙方的责任条款，并同意本协议所有条款。</p>
                    <p>（六）乙方负责承担反洗钱的职责，根据人民银行相关规定做好客户身份识别、资料保存及其他相关工作。</p>
                    <!-- 第三条 -->
                    <p class="bold">第三条 丙方声明如下：</p>
                    <p>（一）丙方是依法设立的商业银行，能够履行网络借贷交易资金的资金划转和存管职责。丙方仅按照本协议条款
                        规定的内容承担资金划转和存管职责。丙方不负责对甲方进行身份识别，不负责审核甲方资金来源的合法合规性。
                    </p>
                    <p>（二）丙方具有开展网络借贷交易资金存管的必要条件，通过存管系统能够为甲方的网络借贷交易资金提供相关
                        的服务。丙方不负责审核乙方所提供融资人和融资项目的真实性和合法性、也不保障融资人和融资项目必然还款。
                    </p>
                    <p>（三）丙方在严格遵循国家有关法律、法规以及规章的前提下，办理甲方网络借贷资金存管业务。</p>
                    <p>（四）丙方承诺其通过自身服务系统执行甲方及乙方的指令，并确保执行行为的及时、准确、有效；如因执行行
                        为不及时、不准确、未生效而导致甲方或乙方等相关方损失的，丙方按照其过错承担相应责任。</p>
                        <!-- 第二章 -->
                    <p class="bold center">第二章 释义</p>
                    <p><span class="bold">第四条 </span>存管系统：指丙方运营的、基于网络借贷业务的资金存管服务系统，提供甲
                    方存管账户开立、充值、出借、还款、提现、交易信息管理、账户信息查询、对账清算等服务。</p>
                    <p><span class="bold">第五条 </span>存管账户：指由甲方在丙方存管系统实名开立的、用于网络借贷交易资金收
                    支或流转的账户，其主要功能包括充值、出借、还款、提现及丙方提供的其他服务。存管账户可以是甲方在丙方网点
                    柜面开立的账户，也可以是甲方通过丙方存管系统实名开立、与指定银行结算账户建立对应关系的电子账户（简称“存
                    管e户”）。存管e户仅限个人用户，必须指定一个与其同名的银行结算账户作为主账户；个人用户可通过与存管e户同
                    名的银行结算账户将款项划入存管e户；存管e户经甲方启用后，资金可用于乙方平台网络借贷项目出借，也可随时划
                    回主账户。</p>
                    <p><span class="bold">第六条 </span>绑卡：指甲方通过指定服务渠道将甲方本人名下银行结算账户（主账户）与
                    其存管e户建立绑定关系，绑定后即可通过该主账户办理充值及提现。</p>
                    <p><span class="bold">第七条 </span>解绑卡：指甲方通过指定服务渠道将主账户与其存管e户解除绑定关系，解
                    绑后不能再通过该主账户办理充值及提现。</p>
                    <p><span class="bold">第八条 </span>查询：指甲方通过存管账户进行查询交易，主要查询信息包括账户信息、交
                    易明细信息等。</p>
                    <p><span class="bold">第九条 </span>充值：指甲方将资金划入其已建立绑定关系的存管e户的过程。甲方充值时，
                    充值方式包括但不限于通过充值网关转入、绑定卡转入、跨行汇款转入等方式，丙方有权根据风险情况对充值方式进
                    行调整，并保留对种类和限额进行无需预告地调整的权利。甲方从存管e户提取的网络借贷交易资金，只能通过提现
                    划转回到主账户。</p>
                    <p><span class="bold">第十条 </span>提现：指甲方将资金从存管e户划回已绑定的主账户的过程。在符合丙方规
                    定及存管规则的情况下，甲方可以申请将存管e户的资金提现到甲方名下银行结算账户（主账户），该主账户必须是已
                    经在存管e户中绑定的同名银行结算账户。提现资金限额、到账时间因银行机构不同会有所差异，具体标准以丙方平台
                    公告为准。</p>
                    <p class="bold center">第三章 账户服务</p>
                    <p><span class="bold">第十一条 </span>甲方应具有法律规定的完全民事权利能力和行为能力，且为能够独立承担
                    民事责任的自然人，若甲方不具备前述条件，应立即停止注册和使用账户。</p>
                    <p><span class="bold">第十二条 </span>存管账户开立：甲方通过丙方服务渠道，在丙方开立存管账户。该账户用
                    于管理甲方在网络借贷交易中产生的资金结算，并记载甲方网络借贷交易的资金变动明细。</p>
                    <p>申请开立时，需预留甲方手机号码，用于接收授权码、短信验证码以及交易提示短信等。丙方可通过该手机号码
                        向甲方核实身份信息和交易信息。</p>
                    <p class="bold">甲方开立的存管账户仅限甲方本人使用，不得出借、转让或出租。否则，由此产生的损失由甲方自行承担。</p>
                    <p><span class="bold">第十三条 </span>绑卡：甲方在丙方开立的存管e户须绑定甲方名下银行结算账户（主账户）
                    ，方可在乙方平台进行出借等具体交易。存管账户支持绑定的银行卡数量及种类以丙方平台公告为准。</p>
                    <p>除甲方已经在丙方开立的，与其本人存管e户建立绑定关系的银行结算账户（主账户）外，本协议下的其他任何
                        账户均不具有网络借贷交易资金的提现功能。</p>
                    <p><span class="bold">第十四条 解绑卡： </span>甲方通过丙方服务渠道，主账户与其存管e户解除绑定关系，解
                    绑后不能再通过该主账户办理充值及提现。</p>
                    <p><span class="bold">第十五条 存管账户明细查询： </span>甲方可对存管账户中的网络借贷交易资金变化情况进
                    行查询。若甲方对其存管账户资金清算明细或余额有异议，可以要求丙方配合进行查询、核实工作。</p>
                    <p><span class="bold">第十六条 出借： </span>在甲方作为出借人进行出借环节，甲方应确保其存管账户中具有充
                    足的可出借金，如因甲方存管账户可出借金不足而使得出借不成功的，丙方不承担任何责任。如甲方出借时，乙方需进
                    行审核的，因乙方审核不通过而使得出借不成功的，丙方不承担任何责任。</p>
                    <p><span class="bold">第十七条 出借冻结： </span>在出借资金冻结环节，丙方系统支持在募集期内冻结多个出借
                    人存管账户出借资金，待乙方审核通过确认出借交易成功后解冻出借人资金并自动将实际成交资金划转到融资人存管账
                    户。因乙方审核未通过，而导致甲方出借不成功的，丙方不承担任何责任。</p>
                    <p><span class="bold">第十八条 还款： </span>在还款环节，乙方在取得甲方（如甲方作为还款人）充分授权的情
                    况下，根据融资项目实际情况办理从融资人存管账户还款到出借人存管账户的资金划转手续。授权文件由乙方保留，
                    如丙方需要查阅时，乙方应予以支持。如因乙方未能取得还款人的充分授权而可能导致丙方或还款人等相关方损失的，
                    乙方应承担一切相关责任。</p>
                    <p><span class="bold">第十九条 费用扣划：</span>乙方承诺从甲方收取的各项费用已经取得甲方授权，授权文件
                    由乙方保留，如丙方需要查阅时，乙方应予以支持。丙方只根据乙方的指令进行划款，不对扣收款项进行进一步审查，
                    甲乙双方由于扣收费用带来的纠纷，由甲乙双方自行处理，不得追究丙方责任。</p>
                    <p><span class="bold">第二十条 其他资金划转： </span>对于同一融资项目项下甲方授权乙方办理的除出借人之外
                    的其他项目参与方之间的资金划转行为，乙方承诺已经取得甲方授权，授权文件由乙方保留，如丙方需要查阅时，乙方
                    应予以支持。丙方只根据乙方的指令进行划款，不对扣收款项进行进一步审查，甲乙双方由于转账行为带来的纠纷，由
                    甲乙双方自行处理，不得追究丙方责任。</p>
                    <p><span class="bold">第二十一条 </span>乙方承诺不得将自有财产与甲方存管账户内客户资金进行混同，甲方存管
                    账户内客户资金不属于乙方的固有财产。乙方因依法解散、被撤销或被宣告破产等原因进行清算的，存管账户内客户资金
                    不属于乙方清算财产。</p>
                    <p class="bold center">第四章 信息变更</p>
                    <p><span class="bold">第二十二条 </span>甲方修改存管账户交易密码、关联手机号码等基础信息，需在丙方指定
                    渠道办理（具体由丙方确定）。 </p>
                    <p>甲方办理以上所列变更事项无需与乙方、丙方重新签署协议，本协议继续有效。</p>
                    <p><span class="bold">第二十三条</span>有下列情形之一的，乙方或丙方可要求甲方限期纠正，甲方不能按期纠
                    正或拒不纠正的，经乙方和丙方双方确认后，乙方与丙方可终止本协议：</p>
                    <p>（一）乙方或丙方发现甲方向其提供的资料、证件严重失实；</p>
                    <p>（二）甲方有严重损害乙方或丙方合法权益、影响其正常经营秩序的行为；</p>
                    <p>（三）甲方的资金来源不合法；</p>
                    <p>（四）监管机构认定的其他情形。</p>
                    <p>乙方和丙方单方面终止本协议时，应通过乙方服务渠道向甲方发送协议终止通知，并自协议终止通知发布之时起，
                        乙方与丙方均不接受甲方的存管资金划转指令。本协议终止，不影响乙方与丙方依法追究甲方违约责任的权利。</p>
                    <p><span class="bold">第二十四条 </span>乙方如单方变更或注销甲方开立在乙方平台的交易账户，应及时通知甲
                    方、丙方。丙方对因此产生的任何纠纷不承担责任。</p>
                    <!-- 第五章 -->
                    <p class="bold center">第五章 三方的责任条款</p>
                    <p><span class="bold">第二十五条  </span>乙方因未有效履行甲方投融资资产的管理主体、清算交收义务，所导致
                    的甲方投融资资产损失或甲方交易无法正常进行的，由乙方承担赔偿责任。丙方并不因上述任何原因向甲方承担赔偿责任。</p>
                    <p><span class="bold">第二十六条  </span>如因乙方故意或重大过失导致的交易账户差错并使甲方交易无法正常进
                    行或存管账户资金无法正常划转支取的，由乙方根据有关规定承担相应的责任。</p>
                    <p><span class="bold">第二十七条  </span>丙方需妥善保管甲方的网络借贷交易资金。丙方因不履行存管义务，超
                    过相关协议规定的委托范围汇划资金，造成甲方及乙方损失的，由丙方承担赔偿责任。</p>
                    <p><span class="bold">第二十八条  </span>因甲方网络借贷交易资金存取造成的差错事故，以丙方数据为准，由乙
                    方、丙方负责查明原因并调账。因甲方出借交易造成的差错事故，以乙方交易数据为准，由乙方负责查明原因并调账。</p>
                    <p><span class="bold">第二十九条  </span>乙方未如实执行甲方下达的交易委托指令，导致甲方损失的，由乙方承
                    担赔偿责任，如乙方遇到不可抗力的情况除外。丙方并不因此向甲方承担赔偿责任。</p>
                    <p  class="bold">第三十条 乙方、丙方郑重提醒甲方注意用户号和密码的保密。任何使用甲方密码进行的交易委托或
                        资金划转均视为甲方本人所为和有效的甲方指令。由于甲方未尽到防范风险的义务造成其用户号及密码失密及其他非
                        乙方、丙方原因而导致的甲方损失，乙方、丙方不承担任何责任。</p>
                    <p><span class="bold">第三十一条  </span>乙方、丙方对甲方的开户资料、委托事项、交易记录等资料负有保密义
                    务，除法律法规或监管机构（包括丙方上市地监管机构）另有规定；或向政府授权的信用联合征信机构提供；或因审计
                    需要向审计机构提供；或因其他原因向法律服务机构提供；或甲方指示外，不得向第三人透露。乙方、丙方承担因其擅
                    自泄露甲方资料给甲方造成的直接损失。</p>
                    <p><span class="bold">第三十二条  </span>甲方应妥善保管其交易账户信息及个人银行借记账户信息或机构客户银
                    行账户信息。</p>
                    <p><span class="bold">第三十三条   </span>若甲方遗失交易账户信息、身份证件，应及时向乙方办理挂失，在挂失
                    生效前已经发生的资金账户损失由甲方承担。甲方遗失个人银行借记账户信息，应及时向其开户银行办理挂失，在挂失
                    生效前已发生的转账业务所产生的损失及其他损失由甲方承担。</p>
                    <p><span class="bold">第三十四条   </span>因地震、台风、水灾、火灾、战争及其他不可抗力因素导致的甲方损失，
                    乙方、丙方均不承担任何赔偿责任。</p>
                    <p><span class="bold">第三十五条   </span>因乙方、丙方不可预测或无法控制的系统故障、设备故障、通讯故障、
                    停电等突发事故，给甲方造成的损失，乙方、丙方不承担任何赔偿责任。</p>
                    <p><span class="bold">第三十六条   </span>因互联网上传输原因，交易和资金划转指令出现中断、停顿、延迟、数
                    据错误等情况以及乙方或丙方不可预测或不可控制因素而造成甲方不能正常交易和转账，乙方、丙方不承担责任，但乙
                    方、丙方保证尽快采取其他方式使交易正常运行。</p>
                    <p><span class="bold">第三十七条   </span>甲方为进行网络借贷交易使用的网站或软件必须是乙方指定站点公示或
                    下载的。甲方使用其他途径获得的网站或软件，由此产生的后果由甲方自行承担。</p>
                    <p><span class="bold">第三十八条   </span>当第三十六条、第三十七条所述事件发生后，乙方、丙方应当配合甲方
                    及时采取措施防止甲方损失可能的进一步扩大。</p>
                    <p><span class="bold">第三十九条    </span>乙方应本着勤勉尽责的精神忠实地向甲方提供信息、资料。乙方向甲方
                    提供的各种信息及资料，仅作为出借参考，甲方应自行承担据此进行出借所产生的风险。</p>
                    <p><span class="bold">第四十条    </span>甲方在签署本协议前已经在乙方办理的任何交易均与丙方无关，丙方仅依
                    据乙方提供的数据办理存量客户迁移工作，由此可能产生的损失，丙方不承担责任。</p>
                    <p><span class="bold">第四十一条    </span>甲、乙、丙三方各自依照相关法律与本协议承担违约责任，任何一方不
                    对其他方的行为承担责任。</p>
                    <p><span class="bold">第四十二条    </span>因法律法规变化、监管部门的监管要求等，导致丙方不能履行存管义务
                    的，丙方有权解除本协议，丙方不承担任何责任。</p>
                    <p><span class="bold">第四十三条    </span>如乙方出现重大财务风险、诉讼风险等重大风险，导致甲方无法收到预
                    期本金及收益的，丙方不对甲方承担任何责任。</p>
                    <p><span class="bold">第四十四条    </span>如发生乙丙双方签署的《存管协议》项下合同解除的事宜，丙方有权解
                    除与甲方、乙方的存管约定，本协议自动解除。甲乙双方承诺不追究丙方责任。</p>
                    <!-- 第六章 -->
                    <p class="bold center">第六章 争议的解决</p>
                    <p><span class="bold">第四十五条     </span>因本协议引起的或与本协议有关的任何争议，由协议签订各方协商解
                    决；协商不成的，应向丙方所在地法院起诉。争议期间，各方仍应履行未涉争议的条款。</p>
                    <p class="bold center">第七章 附 则</p>
                    <p><span class="bold">第四十六条     </span>乙方按照有关法律法规及乙方交易规则的规定向甲方收取手续费、交
                    易产生税费由交易各方自行缴纳。</p>
                    <p><span class="bold">第四十七条     </span>甲方的交易委托凭证和资金存取凭证是指其在乙方渠道所形成的乙方
                    和丙方系统记录资料。</p>
                    <p><span class="bold">第四十八条     </span>乙方和丙方必须根据法律法规规定的方式和期限保存甲方的交易委托
                    凭证和资金存取凭证等资料。</p>
                    <p><span class="bold">第四十九条     </span>本协议由甲方通过丙方指定提供的服务界面操作，各方在该服务界面
                    进行的任何形式的确认，包括但不限于数字证书、密码、点击确认等形式均视为各方的可靠电子签名。本协议经（1）
                    甲方通过上述方式确认同意签署本协议，且（2）乙方和丙方提示交易成功后，于系统记录的签约日期之日起发生法律
                    效力。乙方和丙方还将另行以书面方式签署本协议作为备案，由法定代表人或授权代表在本协议上签字或签章并加盖公
                    章或合同专用章。</p>
                    <p><span class="bold">第五十条     </span>本协议生效后，若有关法律法规、规章制度出台或修订，相关条款按新
                    出台或修订的法律法规、规章制度办理；本协议中如有与未来出台或修订的法律法规、规章制度存在冲突或不一致的条
                    款，自相关法律法规、规章制度生效之日起即可确认此类条款无效。但本协议其他条款继续有效。</p>
                    <p><span class="bold">第五十一条     </span>本协议根据法律法规规章和监管机构、乙方或丙方业务规章等的规定
                    如需修改或增补，修改或增补的内容将由乙方以公告形式通知甲方，若甲方在七日内不提出异议，公告内容即成为本协
                    议组成部分。</p>
                    <p><span class="bold">第五十二条     </span>本协议所指的通知方式除上述条款中已有约定外，可以是书面送达通
                    知或公告通知。公告通知自公告在乙方丙方经营场所、各方网站发布之日起生效。</p>
                    <p><span class="bold">第五十三条     </span>本协议生效后，至下列任一事件发生时终止：</p>
                    <p>（一）乙方或丙方根据本协议第二十三条的规定终止本协议；</p>
                    <p>（二）乙方、丙方签署的《存管协议》终止。</p>
                 
                        <!-- <p style="margin:60px 0;padding-left:30px;">签订日期：&nbsp;&nbsp;
                            <span>{{year}}</span> 年
                            <span>{{month}}</span> 月
                            <span>{{day}}</span> 日
                            </p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Investment',    // 登录框状态 
    data() {
        return {
            date: '',                // 当前的时间
            year: '',                // 当前的年份
            month: '',               // 当前的月份
            day: '',
        }
    },
    props: {
        name: String,
        id : String,
    },
    methods: {
        InvestmentFalg() {
            this.$emit('close', false);
        },
        initData() {
            this.date = new Date()
            this.year = this.date.getFullYear()
            this.month = this.date.getMonth() + 1
            this.day = this.date.getDate()
            if (this.month < 10) this.month = "0" + this.month
            if (this.day < 10) this.day = "0" + this.day
        }
    },
    mounted: function() {
        this.initData()
    },
}  
</script>

<style lang="scss">
#Investment {
    .bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        opacity: 0.6;
        background: #000;
        z-index: 100;
    }
    .xubox_layer {
        position: absolute;
        width: 820px;
        height: 600px;
        background-color: #fff;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 200;
        border-radius: 5px;
        .title {
            width: 100%;
            height: 50px;
            border-radius: 5px;
            border-bottom: 1px solid #f2f2f2;
            background: #e7e7e7;
            font-size: 18px;
            line-height: 50px;
            padding-left: 20px;
            color: #ff6600;
            cursor: move;
            .del.reg {
                width: 50px;
                height: 50px;
                position: absolute;
                right: 0;
                top: 0;
                line-height: 50px;
                margin-right: 10px;
                cursor: pointer;
                text-align: center;
                color: #999;
                i.el-icon-close {
                    transition: transform .3s;
                }
            }
            .del:hover i.el-icon-close {
                transform: rotate(90deg);
            }
        }
        .xubox_page {
            padding: 10px;
            width: 100%;
            height: 550px;
            .content {
                padding: 0;
                line-height: 100px;
                overflow: hidden;
                overflow-y: auto;
                width: 100%;
                height: 530px;
                font-family: "Microsoft YaHei", "arial";
                h3 {
                    font-size: 14px;
                    color: #666;
                    padding: 8px 10px 2px 10px;
                    line-height: 29px;
                }
                p {
                    line-height: 23px;
                    padding: 0 10px 2px 10px;
                    color: #666;
                    font-size: 14px;
                    text-align: justify;
                    text-indent: 2em;
                    span {
                        margin-left: 10px;
                    }
                }
                .bold {
                    font-weight: bold;
                }
                .center {
                    text-align: center
                }
            }
        }
    }
}
</style>