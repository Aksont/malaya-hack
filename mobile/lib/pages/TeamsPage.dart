import 'package:flutter/material.dart';
import 'package:mobile/api/fetchParticipants.dart';
import 'package:mobile/types/Participant.dart';

class TeamsPage extends StatelessWidget {
  final groupTitle = 'Group title goes here';

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: fetchTeams(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          print("FutureBuilder is waiting");
          return Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          print("FutureBuilder has error: ${snapshot.error}");
          return Center(child: Text('Error: ${snapshot.error}'));
        } else {
          return ListView.builder(
            itemCount: snapshot.data!.length,
            itemBuilder: (context, index) {
              final team = snapshot.data![index];
              return ExpansionTileWithData(team: team);
            },
          );
        }
      },
    );
  }
}

class ExpansionTileWithData extends StatefulWidget {
  const ExpansionTileWithData({
    Key? key,
    required this.team,
  }) : super(key: key);

  final Team team;

  @override
  State<ExpansionTileWithData> createState() => _ExpansionTileWithDataState();
}

class _ExpansionTileWithDataState extends State<ExpansionTileWithData> {
  late bool _isExpanded;

  @override
  void initState() {
    super.initState();
    _isExpanded = false;
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ExpansionTile(
        title: Text(widget.team.name),
        onExpansionChanged: (expanded) {
          setState(() {
            _isExpanded = expanded;
          });
        },
        children: [
          _isExpanded
              ? const Text("temp")
              : const Center(
                  child: CircularProgressIndicator(),
                ),
        ],
      ),
    );
  }
}