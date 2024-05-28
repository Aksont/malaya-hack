class Team {
  final String id;
  final String name;
  final List<String> members;

  Team({
    required this.id,
    required this.name,
    required this.members,
  });

  factory Team.fromJson(Map<String, dynamic> json) {
    final p = Team(
      id: json['id'],
      name: json['name'],
      members: List<String>.from(json['members']),
    );
    return p;
  }
}
