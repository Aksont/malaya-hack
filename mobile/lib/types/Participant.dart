class Participant {
  final String id;
  final String name;
  final String email;
  final String academicBackground;
  final List<String> skills;
  final List<String> interests;

  Participant({
    required this.id,
    required this.name,
    this.email = '',
    this.academicBackground = '',
    this.skills = const [],
    this.interests = const [],
  });

  factory Participant.fromJson(Map<String, dynamic> json) {
    final p = Participant(
      id: json['id'],
      name: json['name'] ?? "no name available",
      email: json['email'] ?? 'no email available',
      academicBackground: json['academicBackground'] ?? 'no background available',
      skills: json['skills'] != null ? List<String>.from(json['skills']) : ['no skills available'],
      interests: json['interests'] != null ? List<String>.from(json['interests']) : ['no interests available'],
    );
    return p;
  }
}
