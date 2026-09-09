import 'dart:convert';

import 'package:flutter/services.dart' show rootBundle;

class HnkLesson1Card {
  final String id;
  final String meaningPt;
  final String opiEnglish;
  final String hnkQuestion;
  final String hnkQuestionGlyphs;
  final String hnkQuestionSegments;
  final String hnkAnswer;
  final String hnkAnswerGlyphs;
  final String? hnkAnswerSlot;
  final String esperanto;
  final String esperantoTranslit;
  final String hebrew;
  final String hebrewTranslit;
  final String greek;
  final String greekTranslit;

  const HnkLesson1Card({
    required this.id,
    required this.meaningPt,
    required this.opiEnglish,
    required this.hnkQuestion,
    required this.hnkQuestionGlyphs,
    required this.hnkQuestionSegments,
    required this.hnkAnswer,
    required this.hnkAnswerGlyphs,
    required this.hnkAnswerSlot,
    required this.esperanto,
    required this.esperantoTranslit,
    required this.hebrew,
    required this.hebrewTranslit,
    required this.greek,
    required this.greekTranslit,
  });

  factory HnkLesson1Card.fromJson(Map<String, dynamic> j) {
    return HnkLesson1Card(
      id: j['id'] as String,
      meaningPt: j['meaning_pt'] as String,
      opiEnglish: (j['opi_english'] ?? '') as String,
      hnkQuestion: j['hnk_question'] as String,
      hnkQuestionGlyphs: j['hnk_question_glyphs'] as String,
      hnkQuestionSegments: j['hnk_question_segments'] as String,
      hnkAnswer: j['hnk_answer'] as String,
      hnkAnswerGlyphs: j['hnk_answer_glyphs'] as String,
      hnkAnswerSlot: j['hnk_answer_slot'] as String?,
      esperanto: j['esperanto'] as String,
      esperantoTranslit: j['esperanto_translit'] as String,
      hebrew: j['hebrew'] as String,
      hebrewTranslit: j['hebrew_translit'] as String,
      greek: j['greek'] as String,
      greekTranslit: j['greek_translit'] as String,
    );
  }
}

class HnkTeacherDrill {
  final String id;
  final String category;
  final String hnk;
  final String glyphs;
  final String segments;
  final String pt;
  final int rawSum;
  final int r40;
  final int r10;

  const HnkTeacherDrill({
    required this.id,
    required this.category,
    required this.hnk,
    required this.glyphs,
    required this.segments,
    required this.pt,
    required this.rawSum,
    required this.r40,
    required this.r10,
  });

  factory HnkTeacherDrill.fromJson(Map<String, dynamic> j) {
    return HnkTeacherDrill(
      id: j['id'] as String,
      category: j['category'] as String,
      hnk: j['hnk'] as String,
      glyphs: j['glyphs'] as String,
      segments: j['segments'] as String,
      pt: j['pt'] as String,
      rawSum: j['raw_sum'] as int,
      r40: j['r40'] as int,
      r10: j['r10'] as int,
    );
  }
}

class HnkLesson1Release {
  static const expectedVersion = '1.0.0';
  static const expectedStatus = 'PUBLICATION-FROZEN';

  final String version;
  final String status;
  final List<HnkLesson1Card> cards;
  final List<HnkTeacherDrill> drills;
  final List<String> watchLexemes;

  const HnkLesson1Release({
    required this.version,
    required this.status,
    required this.cards,
    required this.drills,
    required this.watchLexemes,
  });

  factory HnkLesson1Release.fromJson(Map<String, dynamic> j) {
    final release =
        (j['release'] ?? const <String, dynamic>{}) as Map<String, dynamic>;

    final value = HnkLesson1Release(
      version: (j['version'] ?? '') as String,
      status: (j['status'] ?? '') as String,
      cards: (j['student_cards'] as List<dynamic>)
          .map((e) => HnkLesson1Card.fromJson(e as Map<String, dynamic>))
          .toList(growable: false),
      drills: (j['teacher_drills'] as List<dynamic>)
          .map((e) => HnkTeacherDrill.fromJson(e as Map<String, dynamic>))
          .toList(growable: false),
      watchLexemes:
          ((release['watch_lexemes'] ?? const <dynamic>[]) as List<dynamic>)
              .cast<String>()
              .toList(growable: false),
    );

    value.validate();
    return value;
  }

  static HnkLesson1Release parse(String raw) {
    return HnkLesson1Release.fromJson(
      jsonDecode(raw) as Map<String, dynamic>,
    );
  }

  void validate() {
    if (version != expectedVersion) {
      throw FormatException(
        'HNK Lesson 1 version drift: expected $expectedVersion, got $version',
      );
    }
    if (status != expectedStatus) {
      throw FormatException(
        'HNK Lesson 1 status drift: expected $expectedStatus, got $status',
      );
    }
    if (cards.length != 10) {
      throw FormatException(
        'HNK Lesson 1 OPI drift: expected 10 cards, got ${cards.length}',
      );
    }
    if (drills.length != 72) {
      throw FormatException(
        'HNK Lesson 1 drill drift: expected 72 drills, got ${drills.length}',
      );
    }

    const expectedOpi = <String>[
      "What's your name?",
      "Do you have a nickname?",
      "How old are you?",
      "Where were you born?",
      "Where do you work?",
      "What do you do at work/school?",
      "Where do you live and who do you live with?",
      "What are your hobbies?",
      "Do you like to sing?",
      "What do you do on weekends?",
    ];

    for (var i = 0; i < expectedOpi.length; i++) {
      if (cards[i].opiEnglish != expectedOpi[i]) {
        throw FormatException(
          'HNK OPI drift at ${i + 1}: '
          '${cards[i].opiEnglish} != ${expectedOpi[i]}',
        );
      }
      if (cards[i].esperantoTranslit.trim().isEmpty ||
          cards[i].hebrewTranslit.trim().isEmpty ||
          cards[i].greekTranslit.trim().isEmpty) {
        throw FormatException(
          'Missing bridge transliteration at ${cards[i].id}',
        );
      }
    }

    const expectedWatch = <String>{
      'SARASALA',
      'VAMAVALA',
      'VAMAZAMU',
    };
    if (watchLexemes.toSet().difference(expectedWatch).isNotEmpty ||
        expectedWatch.difference(watchLexemes.toSet()).isNotEmpty) {
      throw FormatException(
        'HNK watch lexeme drift: $watchLexemes',
      );
    }
  }
}

abstract interface class HnkLesson1Repository {
  Future<HnkLesson1Release> load();
}

class AssetHnkLesson1Repository implements HnkLesson1Repository {
  final String assetPath;

  const AssetHnkLesson1Repository({
    this.assetPath = 'assets/hnk/lesson1/lesson1.release.v1.json',
  });

  @override
  Future<HnkLesson1Release> load() async {
    final raw = await rootBundle.loadString(assetPath);
    return HnkLesson1Release.parse(raw);
  }
}

class MemoryHnkLesson1Repository implements HnkLesson1Repository {
  final HnkLesson1Release release;
  const MemoryHnkLesson1Repository(this.release);

  @override
  Future<HnkLesson1Release> load() async => release;
}
