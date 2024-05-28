import 'package:flutter/material.dart';
import 'package:mobile/api/fetchParticipants.dart';
import 'package:mobile/api/fetchTeamMembers.dart';
import 'package:mobile/api/fetchTeams.dart';
import 'package:mobile/screens/ParticipantDetails.dart';
import 'package:mobile/types/Participant.dart';
import 'package:mobile/types/Team.dart';

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
        childrenPadding: EdgeInsets.symmetric(horizontal: 15.0),
        title: Text(widget.team.name),
        onExpansionChanged: (expanded) {
          setState(() {
            _isExpanded = expanded;
          });
        },
        expandedAlignment: Alignment.centerLeft,
        children: [
          _isExpanded
              ? FutureBuilder(
                  future: fetchTeamMembers(widget.team.id),
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      print("FutureBuilder is waiting");
                      return Center(child: CircularProgressIndicator());
                    } else if (snapshot.hasError) {
                      print("FutureBuilder has error: ${snapshot.error}");
                      return Center(child: Text('Error: ${snapshot.error}'));
                    } else {
                      return Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          ...snapshot.data!.map(
                            (participant) => GestureDetector(
                              onTap: () => showDialog(
                                context: context,
                                builder: (context) => ParticipantDetails(participant),
                              ),
                              child: Padding(
                                padding: EdgeInsets.all(8.0),
                                child: Text(participant.name),
                              ),
                            ),
                          ),
                        ],
                      );
                    }
                  },
                )
              : const Text(''),
        ],
      ),
    );
  }
}
